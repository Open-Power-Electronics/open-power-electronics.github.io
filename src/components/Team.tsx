import { ArrowUpRight, Mail } from "lucide-react"
import { GITHUB_ORG_URL } from "@/content/site.ts"
import { contactEmail, institutions, teamMembers } from "@/content/team.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { ChapterSection, GithubMark, SectionHeader, revealDelay } from "./primitives.tsx"

function initials(name: string): string {
  const parts = name.split(" ").filter((part) => part !== "")
  if (parts.length < 2) throw new Error(`team member needs a given and family name: ${name}`)
  return `${parts[0][0]}${parts[parts.length - 1][0]}`
}

export function Team() {
  const { t } = useI18n()
  const team = t.team

  return (
    <ChapterSection chapter="team" className="bg-paper">
      <div className="container-page">
        <SectionHeader chapter="team" title={team.title} />

        <h3 data-reveal className="mt-14 font-mono text-[12px] tracking-[0.06em] text-muted uppercase">
          {team.core}
        </h3>
        <ul className="mt-5 grid max-w-[800px] gap-3 sm:grid-cols-2">
          {teamMembers.map((member, index) => {
            const details = [member.role, member.affiliation].filter((value) => value !== "")
            const body = (
              <>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mint text-[14px] font-bold tracking-[-0.02em] text-green">
                  {initials(member.name)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-semibold tracking-[-0.015em] text-ink">{member.name}</span>
                  {details.length > 0 && <span className="mt-0.5 block truncate text-[13.5px] text-body">{details.join(" · ")}</span>}
                </span>
                {member.link !== "" && <ArrowUpRight className="size-4 text-faint transition-colors group-hover:text-green" />}
              </>
            )
            return (
              <li key={member.name} data-reveal style={revealDelay((index % 3) * 0.05)}>
                {member.link === "" ? (
                  <div className="flex items-center gap-4 rounded-2xl border border-line bg-white px-4 py-4">{body}</div>
                ) : (
                  <a href={member.link} className="group flex items-center gap-4 rounded-2xl border border-line bg-white px-4 py-4 transition-colors hover:border-green/40">
                    {body}
                  </a>
                )}
              </li>
            )
          })}
        </ul>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
          <div data-reveal>
            <h3 className="font-mono text-[12px] tracking-[0.06em] text-muted uppercase">{team.institutions}</h3>
            {institutions.length === 0 ? (
              <p className="mt-4 text-[16px] text-faint">{team.institutionsEmpty}</p>
            ) : (
              <ul className="mt-4 flex flex-col gap-2 text-[16px] font-medium text-ink-2">
                {institutions.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            )}
          </div>
          <div data-reveal style={revealDelay(0.06)}>
            <h3 className="font-mono text-[12px] tracking-[0.06em] text-muted uppercase">{team.contact}</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a href={GITHUB_ORG_URL} className="inline-flex items-center gap-2.5 text-[16px] font-medium text-ink-2 transition-colors hover:text-green">
                  <GithubMark className="size-4" />
                  {team.contactGithub}
                  <ArrowUpRight className="size-3.5 text-faint" />
                </a>
              </li>
              {contactEmail !== "" && (
                <li>
                  <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2.5 text-[16px] font-medium text-ink-2 transition-colors hover:text-green">
                    <Mail className="size-4" />
                    {contactEmail}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </ChapterSection>
  )
}
