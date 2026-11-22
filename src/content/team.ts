export const MAP_SIZE = { width: 1120, height: 476 } as const

/** Callouts use the artwork's coordinates. Compact leads keep their geographic pads. */
export const schools = {
  berkeley: {
    logo: "/media/team/berkeley.png",
    pad: [201.4, 179],
    dock: "above",
    wide: { terminal: [117, 98], lead: "M201.4 179H183L117 113V98" },
    compact: { terminal: [164, 77], lead: "M201.4 179H184.4L164 158.6V77" },
  },
  ucla: {
    logo: "/media/team/ucla.svg",
    pad: [212.6, 190.8],
    dock: "below",
    wide: { terminal: [112, 259], lead: "M212.6 190.8H200L181 209.8V232L154 259H112" },
    compact: { terminal: [165, 349], lead: "M212.6 190.8H198L165 223.8V349" },
  },
  mit: {
    logo: "/media/team/mit.svg",
    pad: [351.5, 165.1],
    dock: "above",
    wide: { terminal: [375, 101], lead: "M351.5 165.1V149L375 125.5V101" },
    compact: { terminal: [554, 75], lead: "M351.5 165.1V140.5L410 82H547L554 75" },
  },
  glasgow: {
    // University site icon: https://www.gla.ac.uk/3t4/img/hd_hi.png
    logo: "/media/team/glasgow.png",
    pad: [547.4, 123.2],
    dock: "below",
    wide: { terminal: [505, 216], lead: "M547.4 123.2V162.6L505 205V216" },
    compact: { terminal: [560, 291], lead: "M547.4 123.2V217.4L560 230V291" },
  },
  eindhoven: {
    logo: "/media/team/eindhoven.svg",
    pad: [576.1, 136.9],
    dock: "above",
    wide: { terminal: [625, 99], lead: "M576.1 136.9H590.9L625 102.8V99" },
    compact: { terminal: [930, 78], lead: "M576.1 136.9H589L641.9 84H924L930 78" },
  },
  westlake: {
    logo: "/media/team/westlake.png",
    pad: [912.1, 202.3],
    dock: "below",
    wide: { terminal: [995, 256], lead: "M912.1 202.3H925L978.7 256H995" },
    compact: { terminal: [953, 349], lead: "M912.1 202.3H925L953 230.3V349" },
  },
} as const

export type SchoolId = keyof typeof schools
export type TeamRole =
  | "doctoral"
  | "visitingScholar"
  | "visitingResearcher"
  | "researchAssistant"
  | "assistantProfessor"
  | "associateProfessor"
  | "masters"
  | "masterOfEngineering"
  | "postgraduateResearchStudent"
  | "phd"

type TeamMember = {
  name: string
  link: string
  connections: readonly [SchoolId, TeamRole][]
}

/** Website credits follow the order shown in the project film. */
export const teamMembers: readonly TeamMember[] = [
  {
    name: "Xiao Yang",
    link: "https://fleaxiao.github.io/",
    connections: [["eindhoven", "doctoral"], ["westlake", "visitingScholar"]],
  },
  {
    name: "Yukang Zhu",
    link: "https://cn.linkedin.com/in/yukang-zhu-b33a6a250",
    connections: [["westlake", "visitingResearcher"], ["ucla", "masters"]],
  },
  {
    name: "Wenhao Deng",
    link: "https://www.gla.ac.uk/pgrs/wenhaodeng/",
    connections: [["glasgow", "postgraduateResearchStudent"]],
  },
  {
    name: "Tian Xia",
    link: "https://ai4s.lab.westlake.edu.cn/people/",
    connections: [["westlake", "researchAssistant"], ["berkeley", "masterOfEngineering"]],
  },
  {
    name: "Chengmin Li",
    link: "https://research.tue.nl/en/persons/chengmin-li/",
    connections: [["eindhoven", "assistantProfessor"]],
  },
  {
    name: "Dongsheng Yang",
    link: "https://research.tue.nl/en/persons/dongsheng-yang/",
    connections: [["eindhoven", "associateProfessor"]],
  },
  {
    name: "Tailin Wu",
    link: "https://tailin.org/",
    connections: [["westlake", "assistantProfessor"], ["mit", "phd"]],
  },
]
