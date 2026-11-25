# Portfólio com painel administrativo

1. Crie um projeto separado no Supabase. No SQL Editor, execute `supabase.sql` uma única vez.
2. Em Authentication > Users, crie seu usuário com e-mail e senha e copie o UUID. Desabilite novos cadastros nas configurações de autenticação. Execute `insert into public.portfolio_admins(user_id) values ('UUID-DO-USUARIO');` substituindo pelo UUID real.
3. Copie `.env.example` para `.env.local` e preencha URL e chave pública (anon ou publishable). Nunca use service_role no frontend.
4. Execute `npm install`, `npm run build` e `npm run dev`. Abra o endereço exibido. O rodapé tem Área administrativa. Faça login e publique a primeira edição.
5. Para Vercel, importe o repositório, selecione Vite e configure as mesmas variáveis de ambiente. Build: npm run build; output: dist. O painel usa #admin, sem necessidade de rewrite.

O site inicial funciona sem banco, mas edição exige configuração. O conteúdo publicado é público, inclusive imagens e PDFs; não envie dados privados. Alterações são mantidas no formulário até salvar; uploads são públicos imediatamente, mas o link só entra no site ao publicar. Arquivos antigos podem ser removidos manualmente no Storage. Teste com usuário autorizado, usuário sem autorização e visitante anônimo antes de publicar. Não inclua .env.local no Git.

## Atualização 4.0
Faça backup da pasta atual e exporte o registro portfolio antes de atualizar. Execute somente upgrade-v4.sql no SQL Editor do projeto existente (não repita supabase.sql). Copie o .env atual para a nova pasta. npm install, npm run build, npm run dev. No painel Projetos, status published publica e draft oculta; Salvar rascunho privado guarda todas as edições sem alterar o site. Salvar e publicar publica somente projetos com status published. Galeria, indicadores e documentos usam uma entrada por linha; para remover/reordenar, edite as linhas. Use números únicos e estáveis para os projetos. Arquivos enviados ao bucket existente são públicos mesmo quando o projeto está em rascunho; não envie material confidencial. Remover links não exclui arquivos do Storage. Teste login, publicação, rascunho e acesso anônimo antes do deploy.
