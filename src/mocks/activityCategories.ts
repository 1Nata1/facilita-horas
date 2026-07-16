export type ActivityGroup = "group1" | "group2" | "group3";

export interface ActivityCategory {
  id: string;
  group: ActivityGroup;
  name: string;
  description?: string;
  points: number;
  maxPoints: number;
  unit: string;
}

export const GROUPS: Record<
  ActivityGroup,
  {
    title: string;
    minPoints: number;
    maxPoints: number;
    color: string;
  }
> = {
  group1: {
    title: "Formação Social, Humana e Cultural",
    minPoints: 20,
    maxPoints: 30,
    color: "blue",
  },

  group2: {
    title: "Cunho Comunitário e Interesse Coletivo",
    minPoints: 20,
    maxPoints: 30,
    color: "green",
  },

  group3: {
    title: "Iniciação Científica, Tecnológica e Formação Profissional",
    minPoints: 20,
    maxPoints: 40,
    color: "purple",
  },
};

export const activityCategories: ActivityCategory[] = [
  // ==========================================
  // GRUPO 1
  // Formação Social, Humana e Cultural
  // (mínimo 20 pontos, máximo 30 pontos)
  // ==========================================

  {
    id: "g1-1",
    group: "group1",
    name: "Atividades esportivas",
    description: "Campeonatos oficiais - federações legais, estaduais, municipais, federais - como atleta, árbitro ou dirigente e disciplinas ofertadas pelo Departamento de Acadêmico de Educação Física. Atividades em academias particulares ou clubes não pontuam.",
    points: 3,
    maxPoints: 20,
    unit: "atividade",
  },

  {
    id: "g1-2",
    group: "group1",
    name: "Curso de língua estrangeira",
    description: "Frequência e aprovação em cursos de língua estrangeira em institutos habilitados. Aulas particulares não pontuam. Para pontuar o aluno deve estar matriculado e ser aprovado em escola de idiomas ou nas disciplinas de idiomas da UTFPR, ou apresentar certificado reconhecido de proficiência.",
    points: 0.1,
    maxPoints: 20,
    unit: "hora",
  },

  {
    id: "g1-3",
    group: "group1",
    name: "Atividades artísticas e culturais",
    description: "Apresentações públicas organizadas por entidades oficiais como organizador ou artista: banda marcial, camerata de sopro, bateria, teatro, cinema, coral, acústico PET, radioamadorismo, orquestra, cursos de dança, rodas de conversa, visitas em museus, entre outras.",
    points: 3,
    maxPoints: 15,
    unit: "atividade",
  },

  {
    id: "g1-4",
    group: "group1",
    name: "Participação na organização de exposições e seminários de caráter artístico, cultural e esportivo",
    points: 5,
    maxPoints: 15,
    unit: "organização",
  },

  {
    id: "g1-5",
    group: "group1",
    name: "Participação como membro atuante em exposição artística ou cultural",
    points: 5,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g1-6",
    group: "group1",
    name: "Participação como voluntário em programas ou atividade de produção artístico cultural",
    points: 5,
    maxPoints: 10,
    unit: "semestre",
  },

  {
    id: "g1-7",
    group: "group1",
    name: "Participação em Intercâmbio em instituição nacional",
    points: 5,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g1-8",
    group: "group1",
    name: "Participação em Intercâmbio em instituição internacional",
    points: 10,
    maxPoints: 10,
    unit: "atividade",
  },

  // ==========================================
  // GRUPO 2
  // Atividades de cunho comunitário
  // e de interesse coletivo
  // (mínimo 20 pontos, máximo 30 pontos)
  // ==========================================

  {
    id: "g2-1",
    group: "group2",
    name: "Participação em Diretórios e Centros Acadêmicos, Programa de Educação Tutorial (PET), gestão de atléticas, Entidades de Classe, Conselhos, comissões e Colegiados internos à Instituição",
    points: 5,
    maxPoints: 10,
    unit: "semestre",
  },

  {
    id: "g2-2",
    group: "group2",
    name: "Participação em trabalho eleitoral",
    points: 7,
    maxPoints: 14,
    unit: "turno eleitoral",
  },

  {
    id: "g2-3",
    group: "group2",
    name: "Participação em trabalho voluntário e atividades comunitárias",
    description: "CIPAS, associações de bairros, escoteiros, brigadas de incêndio, associações escolares, entre outras. Doações individuais não pontuam.",
    points: 2,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g2-4",
    group: "group2",
    name: "Participação na organização de atividades beneficentes",
    description: "Organizador ou promotor. A doação de produtos ou contribuir financeiramente não pontua.",
    points: 2,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g2-5",
    group: "group2",
    name: "Doação de sangue, plaquetas, cadastro como doador de medula óssea",
    points: 5,
    maxPoints: 20,
    unit: "doação",
  },

  {
    id: "g2-6",
    group: "group2",
    name: "Atuação como instrutor em palestras técnicas, seminários, cursos da área específica de interesse da sociedade e com participação da comunidade externa",
    points: 5,
    maxPoints: 10,
    unit: "atividade",
  },

  {
    id: "g2-7",
    group: "group2",
    name: "Atuação como docente não remunerado em cursos preparatórios de pré-vestibular e de reforço escolar para comunidade externa em entidades públicas",
    points: 0.5,
    maxPoints: 10,
    unit: "hora",
  },

  {
    id: "g2-8",
    group: "group2",
    name: "Participação em projetos de extensão, remunerados ou não (voluntário) e de interesse social não vinculados à área do curso",
    points: 5,
    maxPoints: 15,
    unit: "semestre",
  },

  {
    id: "g2-9",
    group: "group2",
    name: "Participação no Projeto Rondon",
    points: 30,
    maxPoints: 30,
    unit: "atividade",
  },

  {
    id: "g2-10",
    group: "group2",
    name: "Aplicação de provas (vestibular, ENEM, POSCOMP, concursos, entre outros)",
    points: 2,
    maxPoints: 10,
    unit: "atividade",
  },

  // ==========================================
  // GRUPO 3
  // Iniciação Científica, Tecnológica
  // e Formação Profissional
  // (mínimo 20 pontos, máximo 40 pontos)
  // ==========================================

  {
    id: "g3-1",
    group: "group3",
    name: "Cursos de fundamento técnico, científico ou de gestão",
    description: "Incluindo cursos de ensino à distância (EAD).",
    points: 0.5,
    maxPoints: 20,
    unit: "hora",
  },

  {
    id: "g3-2",
    group: "group3",
    name: "Cursos de fundamento técnico, científico ou de gestão na área profissionalizante",
    description: "Incluindo cursos de ensino à distância (EAD) na área profissionalizante e profissionalizante específico, conforme projeto pedagógico do curso.",
    points: 1,
    maxPoints: 25,
    unit: "hora",
  },

  {
    id: "g3-3",
    group: "group3",
    name: "Participação como ouvinte em palestras técnico-científicas relacionadas ao curso",
    points: 1,
    maxPoints: 15,
    unit: "palestra",
  },

  {
    id: "g3-4-local",
    group: "group3",
    name: "Participação como ouvinte em semanas acadêmicas, encontros, congressos, seminários técnico-científicos (Local)",
    points: 3,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-4-regional",
    group: "group3",
    name: "Participação como ouvinte em semanas acadêmicas, encontros, congressos, seminários técnico-científicos (Regional)",
    points: 4,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-4-nacional",
    group: "group3",
    name: "Participação como ouvinte em semanas acadêmicas, encontros, congressos, seminários técnico-científicos (Nacional)",
    points: 5,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-4-internacional",
    group: "group3",
    name: "Participação como ouvinte em semanas acadêmicas, encontros, congressos, seminários técnico-científicos (Internacional)",
    points: 6,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-5-local",
    group: "group3",
    name: "Apresentador/expositor em exposições técnico-científicas (Local)",
    description: "Mediante apresentação do trabalho.",
    points: 5,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-5-regional",
    group: "group3",
    name: "Apresentador/expositor em exposições técnico-científicas (Regional)",
    description: "Mediante apresentação do trabalho.",
    points: 6,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-5-nacional",
    group: "group3",
    name: "Apresentador/expositor em exposições técnico-científicas (Nacional)",
    description: "Mediante apresentação do trabalho.",
    points: 10,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-5-internacional",
    group: "group3",
    name: "Apresentador/expositor em exposições técnico-científicas (Internacional)",
    description: "Mediante apresentação do trabalho.",
    points: 15,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-6-local",
    group: "group3",
    name: "Publicação de trabalho em anais de eventos técnico-científicos (Local)",
    description: "Deve ser apresentada a ficha catalográfica dos anais ou ISSN e a primeira página da publicação.",
    points: 5,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-6-regional",
    group: "group3",
    name: "Publicação de trabalho em anais de eventos técnico-científicos (Regional)",
    description: "Deve ser apresentada a ficha catalográfica dos anais ou ISSN e a primeira página da publicação.",
    points: 6,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-6-nacional",
    group: "group3",
    name: "Publicação de trabalho em anais de eventos técnico-científicos (Nacional)",
    description: "Deve ser apresentada a ficha catalográfica dos anais ou ISSN e a primeira página da publicação.",
    points: 10,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-6-internacional",
    group: "group3",
    name: "Publicação de trabalho em anais de eventos técnico-científicos (Internacional)",
    description: "Deve ser apresentada a ficha catalográfica dos anais ou ISSN e a primeira página da publicação.",
    points: 15,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-7",
    group: "group3",
    name: "Participação na organização de exposições e seminários de caráter acadêmico ou técnico-científicos (Local)",
    points: 3,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-8",
    group: "group3",
    name: "Participação na organização de exposições e seminários de caráter acadêmico ou técnico-científicos (Regional)",
    points: 4,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-9",
    group: "group3",
    name: "Participação na organização de exposições e seminários de caráter acadêmico ou técnico-científicos (Nacional)",
    points: 5,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-10",
    group: "group3",
    name: "Participação na organização de exposições e seminários de caráter acadêmico ou técnico-científicos (Internacional)",
    points: 6,
    maxPoints: 15,
    unit: "evento",
  },

  {
    id: "g3-11-primeiro-autor",
    group: "group3",
    name: "Publicação em revista técnica (Primeiro autor)",
    points: 20,
    maxPoints: 40,
    unit: "publicação",
  },

  {
    id: "g3-11-coautor",
    group: "group3",
    name: "Publicação em revista técnica (Coautor)",
    points: 15,
    maxPoints: 40,
    unit: "publicação",
  },

  {
    id: "g3-12",
    group: "group3",
    name: "Registro de propriedade intelectual",
    points: 20,
    maxPoints: 40,
    unit: "registro",
  },

  {
    id: "g3-13",
    group: "group3",
    name: "Projeto de iniciação científica e tecnológica",
    points: 5,
    maxPoints: 20,
    unit: "semestre",
  },

  {
    id: "g3-14",
    group: "group3",
    name: "Estágio não obrigatório na área do curso",
    points: 0.1,
    maxPoints: 15,
    unit: "hora",
  },

  {
    id: "g3-15",
    group: "group3",
    name: "Trabalho com vínculo empregatício na área",
    points: 0.1,
    maxPoints: 20,
    unit: "hora",
  },

  {
    id: "g3-16",
    group: "group3",
    name: "Trabalho como empreendedor na área do curso",
    points: 10,
    maxPoints: 20,
    unit: "atividade",
  },

  {
    id: "g3-17",
    group: "group3",
    name: "Estágio acadêmico na UTFPR (inclui monitoria)",
    points: 5,
    maxPoints: 20,
    unit: "semestre",
  },

  {
    id: "g3-18",
    group: "group3",
    name: "Participação em visitas técnicas organizadas pela UTFPR",
    points: 3,
    maxPoints: 15,
    unit: "visita",
  },

  {
    id: "g3-19",
    group: "group3",
    name: "Atuação como instrutor em palestras técnicas, seminários ou cursos da área específica de formação",
    points: 5,
    maxPoints: 15,
    unit: "atividade",
  },

  {
    id: "g3-20",
    group: "group3",
    name: "Participação em Empresa Júnior, Hotel Tecnológico, Incubadora Tecnológica, Escola Piloto, entre outros",
    points: 10,
    maxPoints: 20,
    unit: "atividade",
  },

  {
    id: "g3-21-area",
    group: "group3",
    name: "Participação em projetos multidisciplinares ou interdisciplinares na área do curso",
    description: "Projetos de competição, entre outros.",
    points: 5,
    maxPoints: 15,
    unit: "semestre",
  },

  {
    id: "g3-21-fora-area",
    group: "group3",
    name: "Participação em projetos multidisciplinares ou interdisciplinares fora da área do curso",
    description: "Projetos de competição, entre outros.",
    points: 3,
    maxPoints: 15,
    unit: "semestre",
  },

  {
    id: "g3-22",
    group: "group3",
    name: "Integrante de equipe editorial de periódico",
    points: 0.2,
    maxPoints: 15,
    unit: "hora",
  },

  {
    id: "g3-23-nacional",
    group: "group3",
    name: "Participação em intercâmbio de estudos em instituição de ensino superior com aproveitamento de disciplinas (Nacional)",
    points: 10,
    maxPoints: 30,
    unit: "semestre",
  },

  {
    id: "g3-23-internacional",
    group: "group3",
    name: "Participação em intercâmbio de estudos em instituição de ensino superior com aproveitamento de disciplinas (Internacional)",
    points: 20,
    maxPoints: 30,
    unit: "semestre",
  },
];

export const group1Categories = activityCategories.filter(
  (activity) => activity.group === "group1"
);

export const group2Categories = activityCategories.filter(
  (activity) => activity.group === "group2"
);

export const group3Categories = activityCategories.filter(
  (activity) => activity.group === "group3"
);

export const getCategoriesByGroup = (group: ActivityGroup) => {
  return activityCategories.filter((activity) => activity.group === group);
};
