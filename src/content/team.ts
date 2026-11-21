export type TeamMember = {
  name: string
  role: string
  affiliation: string
  link: string
}

export const teamMembers: readonly TeamMember[] = [
  { name: "Xiao Yang", role: "", affiliation: "", link: "" },
  { name: "Yukang Zhu", role: "", affiliation: "", link: "" },
]

export const institutions: readonly string[] = []

export const contactEmail: string = ""

function assertTeamData(): void {
  const names = new Set<string>()
  for (const member of teamMembers) {
    if (member.name === "") throw new Error("team member name is empty")
    if (names.has(member.name)) throw new Error(`duplicate team member: ${member.name}`)
    names.add(member.name)
    if (member.link !== "" && !member.link.startsWith("https://")) {
      throw new Error(`team link must be an https URL: ${member.name}`)
    }
  }
  const groups = new Set<string>()
  for (const name of institutions) {
    if (name === "") throw new Error("institution name is empty")
    if (groups.has(name)) throw new Error(`duplicate institution: ${name}`)
    groups.add(name)
  }
  if (contactEmail !== "" && !contactEmail.includes("@")) {
    throw new Error("contactEmail is not an email address")
  }
}

assertTeamData()
