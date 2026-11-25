import React from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowUpRight, ArrowDown, BriefcaseBusiness, ChartNoAxesCombined, Code2, Github, Linkedin, Mail, Menu, X, ExternalLink, Target, Workflow, ChevronRight } from 'lucide-react';
import './style.css';
import {Admin, useContent, safeUrl} from './admin';
import type {Content, Project} from './content';
import {CaseStudy} from './case-study';

function App({content}: {content: Content}) {
  const {profile, experience, projects, skills, education}=content;
  const [menuOpen, setMenuOpen] = React.useState(false);
  const year = new Date().getFullYear();
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [activeSection, setActiveSection] = React.useState('inicio');
  React.useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    if (reduced || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('visible'));
    } else {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
      }, { threshold: .12, rootMargin: '0px 0px -35px 0px' });
      elements.forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }
  }, []);
  React.useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(total > 0 ? window.scrollY / total * 100 : 0);
        const sections = ['inicio','sobre','experiencia','competencias','projetos','contato'];
        const current = sections.filter(id => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) < window.innerHeight * .38).pop();
        if (current) setActiveSection(current);
      });
    };
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };
  const nav = [{id:'sobre',label:'Sobre'},{id:'experiencia',label:'Experiência'},{id:'competencias',label:'Competências'},{id:'projetos',label:'Projetos'},{id:'contato',label:'Contato'}];
  return <>
    <div className="scroll-progress" style={{width:`${scrollProgress}%`}} aria-hidden="true"/><header className="header"><div className="container header-inner"><a className="brand" href="#inicio" aria-label="Voltar ao início"><span className="brand-mark">M<span>.</span></span><span className="brand-text">{profile.name}</span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Navegação principal">{nav.map(item=><a key={item.id} href={'#'+item.id} aria-current={activeSection===item.id?'location':undefined} onClick={()=>setMenuOpen(false)}>{item.label}</a>)}</nav>
      <a className="header-cta" href="#contato">Vamos conversar <ArrowUpRight size={16}/></a><button className="menu-button" aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
    </div></header>
    <main>
      <section id="inicio" className="hero" onPointerMove={onPointerMove}><div className="hero-glow"/><div className="hero-mesh" aria-hidden="true"/><div className="hero-orbit orbit-one" aria-hidden="true"/><div className="hero-orbit orbit-two" aria-hidden="true"/><div className="hero-spotlight" aria-hidden="true"/><div className="container hero-content"><div className="eyebrow hero-animate delay-1"><span className="pulse"/> PORTFÓLIO PROFISSIONAL <span className="eyebrow-line"/></div><p className="hero-kicker hero-animate delay-2">{content.text.heroKicker}</p><h1 className="hero-animate delay-3">{content.text.hero1}<br/><em>{content.text.hero2}</em><br/>{content.text.hero3}</h1><p className="hero-desc hero-animate delay-4">{content.text.heroDesc}</p><div className="hero-actions hero-animate delay-5"><a className="button primary" href="#projetos">Explorar projetos <ArrowUpRight size={18}/></a><a className="button ghost" href="#sobre">Conheça minha trajetória <ArrowDown size={17}/></a></div><div className="hero-bottom hero-animate delay-6"><span>INVESTIGAÇÃO</span><span className="dot-separator">/</span><span>ESTRATÉGIA</span><span className="dot-separator">/</span><span>TECNOLOGIA</span><span className="dot-separator">/</span><span>RESULTADOS</span></div></div><div className="hero-outline">01</div><a className="scroll-indicator" href="#sobre" aria-label="Rolar para a próxima seção"><span/>SCROLL TO EXPLORE</a></section>
     <section id="sobre" className="section about-section">
  <div className="container split reveal">

    <div>
      <p className="section-label">01 / SOBRE MIM</p>

      <h2>
        Curiosidade para investigar.
        <br />
        <span>Disciplina para resolver.</span>
      </h2>

      <blockquote className="about-quote">
        “Não me contento em entender como as coisas
        funcionam. Quero descobrir como podem
        funcionar melhor.”
      </blockquote>
    </div>

    <div className="about-copy">
      <p>{content.text.about1}</p>
      <p>{content.text.about2}</p>

      <div className="education">
        <span className="small-label">FORMAÇÃO</span>

        {education.map((e, i) => (
          <div key={i}>
            <strong>{e.title}</strong>
            <span>{e.detail}</span>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>
      <section id="experiencia" className="section shaded"><div className="container"><div className="section-heading reveal"><div><p className="section-label">02 / TRAJETÓRIA</p><h2>Experiência que<br/><span>constrói perspectiva.</span></h2></div><p>Vivências em tecnologia, operações e relacionamento que fortalecem minha visão sobre problemas reais.</p></div><div className="experience-list">{experience.map((job,i)=><article className="experience-row reveal" key={job.role}><span className="row-number">0{i+1}</span><div><h3>{job.role}</h3><p>{job.description}</p><div className="tag-list">{job.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><span className="period">{job.period}</span></article>)}</div></div></section>
      <section id="competencias" className="section"><div className="container"><p className="section-label reveal">03 / COMPETÊNCIAS</p><h2 className="reveal">Conhecimento técnico.<br/><span>Visão multidisciplinar.</span></h2><div className="skills-grid">{skills.map((skill,i)=><article className="skill-card reveal" onPointerMove={onPointerMove} style={{transitionDelay:`${i*75}ms`}} key={skill.title}><div className="skill-top">{React.createElement(({Workflow, Code2, ChartNoAxesCombined, BriefcaseBusiness} as Record<string, typeof Workflow>)[skill.icon] || Workflow,{size:25,strokeWidth:1.6})}<span>0{i+1}</span></div><h3>{skill.title}</h3><ul>{skill.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}</div><p className="skills-note">{content.text.skillsNote}</p></div></section>
      <section id="projetos" className="section shaded"><div className="container"><div className="section-heading reveal"><div><p className="section-label">04 / PROJETOS</p><h2>Ideias transformadas<br/><span>em iniciativas.</span></h2></div><p>Projetos reais e estudos em evolução. Os resultados e as funcionalidades são apresentados conforme o estágio de cada iniciativa.</p></div><div className="projects-grid">{projects.filter(p=>(!p.status||p.status==='published')).map(p=><article className={'project-card reveal '+p.accent} onPointerMove={onPointerMove} key={p.number}><div className="project-visual">{p.image && <img className="project-image" src={safeUrl(p.image)} alt={p.name}/>}<span className="visual-number">{p.number}</span><div className="visual-lines"><span/><span/><span/></div><Target size={70} strokeWidth={.7}/></div><div className="project-body"><p className="project-type">{p.type}</p><h3>{p.name}</h3><p>{p.description}</p><div className="tag-list">{p.stack.map(s=><span key={s}>{s}</span>)}</div><a className="project-footer" href={'#projeto/'+encodeURIComponent(p.number)}>Ver estudo de caso <ChevronRight size={15}/></a></div></article>)}</div></div></section>
      <section id="contato" className="section contact-section"><div className="container reveal"><p className="section-label">05 / CONTATO</p><h2>Vamos transformar<br/><span>problemas em oportunidades.</span></h2><p className="contact-intro">{content.text.contactIntro}</p><div className="contact-actions">{profile.email?<a className="button primary" href={'mailto:'+profile.email}><Mail size={18}/> Enviar e-mail</a>:<span className="button disabled"><Mail size={18}/> E-mail: adicionar endereço</span>}{profile.linkedin?<a className="button ghost" href={safeUrl(profile.linkedin)} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn <ExternalLink size={14}/></a>:<span className="button disabled"><Linkedin size={18}/> LinkedIn: adicionar link</span>}{profile.github?<a className="button ghost" href={safeUrl(profile.github)} target="_blank" rel="noreferrer"><Github size={18}/> GitHub <ExternalLink size={14}/></a>:<span className="button disabled"><Github size={18}/> GitHub: adicionar link</span>}</div>{profile.resume && <a className="button ghost" href={safeUrl(profile.resume)} target="_blank" rel="noreferrer">Currículo PDF</a>}</div></section>
    </main><footer className="footer"><div className="container footer-inner"><span>© {year} {profile.name}</span><span>TECNOLOGIA · ANÁLISE · ESTRATÉGIA</span><a href="#inicio">Voltar ao topo ↑</a><a href="#admin">Área administrativa</a></div></footer>
  </>;
}
function Root(){const [hash,setHash]=React.useState(location.hash); const {content,reload,error}=useContent(); React.useEffect(()=>{const f=()=>setHash(location.hash);window.addEventListener('hashchange',f);return()=>window.removeEventListener('hashchange',f)},[]);const project:Project|undefined=hash.startsWith('#projeto/')?content.projects.find(p=>encodeURIComponent(p.number)===hash.slice(9)&&(!p.status||p.status==='published')):undefined;return hash.startsWith('#projeto/')?(project?<CaseStudy key={project.number} project={project}/>:<main className="case-page container"><a href="#projetos">← Voltar aos projetos</a><h1>Projeto não encontrado</h1></main>):hash==='#admin'?<Admin content={content} reload={reload}/>:<>{error && <div className="admin-notice">{error}</div>}<App key={JSON.stringify(content)} content={content}/></>;}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Root/></React.StrictMode>);
