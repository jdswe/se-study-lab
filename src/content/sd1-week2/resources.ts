import type { ExternalResource, Localized } from '../types';

const L = (en: string, es: string, pt: string): Localized => ({ en, es, pt });
const checked = '2026-11-04';

/** External resources for Software Development 1, Week 2. `verifiedOn` = the link answered on that date. */
export const sd1Week2Resources: ExternalResource[] = [
  { id: 'sd1w2-r-wiki-re', title: 'Wikipedia: Requirements engineering', url: 'https://en.wikipedia.org/wiki/Requirements_engineering', kind: 'article', verifiedOn: checked,
    note: L('Overview of the activities, from elicitation to management.', 'Panorama de las actividades, de la elicitación a la gestión.', 'Visão geral das atividades, da elicitação à gestão.') },
  { id: 'sd1w2-r-wiki-nfr', title: 'Wikipedia: Non-functional requirement', url: 'https://en.wikipedia.org/wiki/Non-functional_requirement', kind: 'article', verifiedOn: checked,
    note: L('A long list of quality attributes with short definitions.', 'Una lista larga de atributos de calidad con definiciones breves.', 'Uma lista longa de atributos de qualidade com definições curtas.') },
  { id: 'sd1w2-r-wiki-srs', title: 'Wikipedia: Software requirements specification', url: 'https://en.wikipedia.org/wiki/Software_requirements_specification', kind: 'article', verifiedOn: checked,
    note: L('What an SRS contains and a typical outline.', 'Qué contiene una ERS y un índice típico.', 'O que uma ERS contém e um sumário típico.') },
  { id: 'sd1w2-r-wiki-trace', title: 'Wikipedia: Requirements traceability', url: 'https://en.wikipedia.org/wiki/Requirements_traceability', kind: 'article', verifiedOn: checked,
    note: L('Forward and backward tracing, and why it matters for change.', 'Rastreo hacia adelante y hacia atrás, y por qué importa ante los cambios.', 'Rastreamento para a frente e para trás, e por que importa nas mudanças.') },
  { id: 'sd1w2-r-wiki-story', title: 'Wikipedia: User story', url: 'https://en.wikipedia.org/wiki/User_story', kind: 'article', verifiedOn: checked,
    note: L('History, templates, and common criticisms of user stories.', 'Historia, plantillas y críticas comunes de las historias de usuario.', 'História, modelos e críticas comuns às histórias de usuário.') },
  { id: 'sd1w2-r-wiki-invest', title: 'Wikipedia: INVEST (mnemonic)', url: 'https://en.wikipedia.org/wiki/INVEST_(mnemonic)', kind: 'article', verifiedOn: checked,
    note: L('Each INVEST letter explained in a few lines.', 'Cada letra de INVEST explicada en pocas líneas.', 'Cada letra do INVEST explicada em poucas linhas.') },
  { id: 'sd1w2-r-wiki-moscow', title: 'Wikipedia: MoSCoW method', url: 'https://en.wikipedia.org/wiki/MoSCoW_method', kind: 'article', verifiedOn: checked,
    note: L('The four MoSCoW categories and how teams use them.', 'Las cuatro categorías de MoSCoW y cómo las usan los equipos.', 'As quatro categorias do MoSCoW e como as equipes as usam.') },
  { id: 'sd1w2-r-atlassian-stories', title: 'Atlassian: User stories with examples and a template', url: 'https://www.atlassian.com/agile/project-management/user-stories', kind: 'tutorial', verifiedOn: checked,
    note: L('Practical guide to writing stories, with examples (also available in Spanish and Portuguese).', 'Guía práctica para escribir historias, con ejemplos (también disponible en español y portugués).', 'Guia prático para escrever histórias, com exemplos (também disponível em espanhol e português).') },
  { id: 'sd1w2-r-atlassian-epics', title: 'Atlassian: Stories, epics, and initiatives', url: 'https://www.atlassian.com/agile/project-management/epics-stories-themes', kind: 'tutorial', verifiedOn: checked,
    note: L('How stories roll up into epics and larger goals.', 'Cómo las historias se agrupan en épicas y objetivos mayores.', 'Como as histórias se agrupam em épicos e objetivos maiores.') },
  { id: 'sd1w2-r-aa-stories', title: 'Agile Alliance glossary: User stories', url: 'https://www.agilealliance.org/glossary/user-stories/', kind: 'article', verifiedOn: checked,
    note: L('Short definition, the three Cs, and the origin of user stories.', 'Definición breve, las tres C y el origen de las historias de usuario.', 'Definição curta, os três Cs e a origem das histórias de usuário.') },
  { id: 'sd1w2-r-aa-invest', title: 'Agile Alliance glossary: INVEST', url: 'https://www.agilealliance.org/glossary/invest/', kind: 'article', verifiedOn: checked,
    note: L('The INVEST checklist from the agile community.', 'La lista INVEST desde la comunidad ágil.', 'A lista INVEST pela comunidade ágil.') },
  { id: 'sd1w2-r-aa-gwt', title: 'Agile Alliance glossary: Given – When – Then', url: 'https://www.agilealliance.org/glossary/gwt/', kind: 'article', verifiedOn: checked,
    note: L('Where the Given–When–Then format comes from and how to use it.', 'De dónde viene el formato Dado–Cuando–Entonces y cómo usarlo.', 'De onde vem o formato Dado–Quando–Então e como usá-lo.') },
  { id: 'sd1w2-r-mgs-stories', title: 'Mountain Goat Software: User stories', url: 'https://www.mountaingoatsoftware.com/agile/user-stories', kind: 'article', verifiedOn: checked,
    note: L('Mike Cohn\'s own introduction to user stories and epics.', 'La introducción de Mike Cohn a las historias de usuario y las épicas.', 'A introdução do próprio Mike Cohn às histórias de usuário e aos épicos.') },
  { id: 'sd1w2-r-gherkin', title: 'Cucumber: Gherkin reference', url: 'https://cucumber.io/docs/gherkin/reference/', kind: 'tutorial', verifiedOn: checked,
    note: L('Every Gherkin keyword; Gherkin also supports Spanish and Portuguese keywords.', 'Todas las palabras clave de Gherkin; Gherkin también admite palabras clave en español y portugués.', 'Todas as palavras-chave do Gherkin; o Gherkin também aceita palavras-chave em espanhol e português.') },
];
