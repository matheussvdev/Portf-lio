create table if not exists public.portfolio_admins (user_id uuid primary key references auth.users(id) on delete cascade);
create table if not exists public.portfolio (id integer primary key check(id=1), content jsonb not null check(jsonb_typeof(content)='object'));
alter table public.portfolio enable row level security;
alter table public.portfolio_admins enable row level security;
revoke all on public.portfolio_admins from anon, authenticated;
grant select on public.portfolio_admins to authenticated;
grant select on public.portfolio to anon, authenticated;
grant insert, update on public.portfolio to authenticated;
create policy "read own membership" on public.portfolio_admins for select to authenticated using (user_id=auth.uid());
create policy "public content" on public.portfolio for select to anon, authenticated using (true);
create policy "admin insert" on public.portfolio for insert to authenticated with check (exists(select 1 from public.portfolio_admins where user_id=auth.uid()));
create policy "admin update" on public.portfolio for update to authenticated using (exists(select 1 from public.portfolio_admins where user_id=auth.uid())) with check (exists(select 1 from public.portfolio_admins where user_id=auth.uid()));
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('portfolio-media','portfolio-media',true,5242880,array['image/jpeg','image/png','image/webp','application/pdf']) on conflict(id) do nothing;
create policy "admin upload" on storage.objects for insert to authenticated with check (bucket_id='portfolio-media' and exists(select 1 from public.portfolio_admins where user_id=auth.uid()));
-- Depois de criar o usuário em Authentication > Users, execute separadamente:
-- insert into public.portfolio_admins(user_id) values ('UUID-DO-USUARIO');
