export const profile = {
  name: 'Matheus Santos Vieira',
  role: 'Tecnologia • Análise de Negócios • Dados',
  // Substitua os campos abaixo pelos seus links e e-mail reais.
  email: '',
  linkedin: '',
  github: '', resume: '',
};

export const experience = [
  { role: 'Auxiliar Técnico de Informática', period: '1 ano e 2 meses', description: 'Diagnóstico e manutenção de notebooks, preparação de equipamentos, instalação de sistemas e suporte a usuários. Participação em iniciativas de padronização e melhoria de processos.', tags: ['Suporte técnico', 'Diagnóstico', 'Melhoria de processos'] },
  { role: 'Assistente Administrativo e Financeiro', period: '6 meses', description: 'Experiência em rotinas administrativas e financeiras, contribuindo para uma visão integrada entre operações, organização e negócio.', tags: ['Operações', 'Administração', 'Finanças'] },
  { role: 'Vendedor', period: '2 meses', description: 'Atuação comercial com foco em comunicação, relacionamento com pessoas e entendimento de necessidades.', tags: ['Relacionamento', 'Comunicação', 'Comercial'] },
];
export type Project = {number:string; type:string; name:string; description:string; stack:string[]; accent:string; image:string; link:string; status?:string; context?:string; problem?:string; investigation?:string; strategy?:string; solution?:string; results?:string; lessons?:string; gallery?:string[]; indicators?:string[]; documents?:string[]};
export const projects: Project[] = [
  { number: '01', type: 'Projeto acadêmico · Em desenvolvimento', name: 'Gestão de Comandas para Pastelaria', description: 'Solução para apoiar o registro de pedidos e o fechamento de comandas. O projeto nasceu da investigação de dificuldades reais do atendimento e inclui funcionalidades para atendentes e administração.', stack: ['Python', 'Flet', 'Supabase', 'Levantamento de requisitos'], accent: 'gold', image:'', link:'' },
  { number: '02', type: 'Projeto pessoal · Em desenvolvimento', name: 'Finansee', description: 'Aplicativo de controle financeiro pessoal com organização de receitas, despesas, cartões, faturas e análises. Foco em clareza das informações e experiência de uso.', stack: ['React Native', 'TypeScript', 'Firebase'], accent: 'blue', image:'', link:'' },
  { number: '03', type: 'Estudo de caso · A desenvolver', name: 'Análise de Negócios e Indicadores', description: 'Espaço reservado para um estudo de caso com diagnóstico, análise de dados, proposta estratégica e validação de resultados.', stack: ['SQL', 'Power BI', 'Estratégia'], accent: 'neutral', image:'', link:'' },
];
export const skills = [
  { icon: 'Workflow', title: 'Processos e resolução de problemas', items: ['Diagnóstico técnico', 'Padronização de procedimentos', 'Levantamento de necessidades'] },
  { icon: 'Code2', title: 'Tecnologia e desenvolvimento', items: ['Python', 'TypeScript', 'React Native', 'Firebase / Supabase'] },
  { icon: 'ChartNoAxesCombined', title: 'Negócios e análise', items: ['Rotinas administrativas e financeiras', 'Organização de informações', 'Interesse em dados e indicadores'] },
  { icon: 'BriefcaseBusiness', title: 'Ferramentas e colaboração', items: ['Microsoft 365', 'Teams', 'AnyDesk / TeamViewer', 'Atendimento ao usuário'] },
];


export const initial = {profile,experience,projects,skills, text:{"heroKicker": "TECNOLOGIA COM VISÃO DE NEGÓCIO", "heroDesc": "Sou Matheus, profissional com experiência em suporte técnico e operações, formação técnica em Informática e graduação em Análise e Desenvolvimento de Sistemas em andamento. Estou direcionando minha carreira para análise de negócios, dados e estratégia de tecnologia.", "skillsNote": "Em desenvolvimento: aprofundamento em análise de negócios, SQL, Power BI e inteligência artificial aplicada.", "contactIntro": "Estou aberto a conversar sobre oportunidades em tecnologia, análise de negócios, dados e melhoria de processos.", "hero1": "Entender o problema.", "hero2": "Construir a solução.", "hero3": "Gerar resultados.", "about1": "Gosto de entender como as coisas funcionam, encontrar a origem de problemas e transformar descobertas em soluções práticas. Minha trajetória em suporte técnico me aproximou da investigação, do atendimento a pessoas e da melhoria de processos.", "about2": "Também tenho experiência em atividades administrativas e financeiras, que ampliaram meu interesse pela conexão entre tecnologia e negócio. Hoje, busco desenvolver uma atuação cada vez mais orientada por dados, estratégia e resultados mensuráveis."},education:[{title:"Análise e Desenvolvimento de Sistemas",detail:"Graduação em andamento · Cruzeiro do Sul"},{title:"Técnico em Informática",detail:"Formação concluída"}]};
export type Content = typeof initial;
