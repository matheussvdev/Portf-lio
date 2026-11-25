-- Execute no projeto existente. Não apaga conteúdo publicado.
create table if not exists public.portfolio_drafts (id integer primary key check(id=1), content jsonb not null check(jsonb_typeof(content)='object'));
alter table public.portfolio_drafts enable row level security;
revoke all on public.portfolio_drafts from anon, authenticated;
grant select, insert, update on public.portfolio_drafts to authenticated;
drop policy if exists "admin drafts" on public.portfolio_drafts;
create policy "admin drafts" on public.portfolio_drafts for all to authenticated using (exists(select 1 from public.portfolio_admins where user_id=auth.uid())) with check (exists(select 1 from public.portfolio_admins where user_id=auth.uid()));
create or replace function public.publish_portfolio_v4(payload jsonb) returns void language plpgsql security invoker set search_path = '' as $$
begin
 if not exists(select 1 from public.portfolio_admins where user_id=auth.uid()) then raise exception 'Acesso negado'; end if;
 insert into public.portfolio_drafts(id,content) values(1,payload) on conflict(id) do update set content=excluded.content;
 insert into public.portfolio(id,content) values(1,jsonb_set(payload,'{projects}',coalesce((select jsonb_agg(p order by n) from jsonb_array_elements(payload->'projects') with ordinality as t(p,n) where coalesce(p->>'status','published')='published'),'[]'::jsonb))) on conflict(id) do update set content=excluded.content;
end; $$;
revoke all on function public.publish_portfolio_v4(jsonb) from public, anon;
grant execute on function public.publish_portfolio_v4(jsonb) to authenticated;
