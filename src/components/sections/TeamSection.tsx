import { contactEmail, institutions, teamMembers } from "@/content/team.ts"
import { GITHUB_ORG_URL } from "@/content/site.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"

export function TeamSection() {
  const { t } = useI18n()
  return (
    <section id="team" data-nav="team" className="reveal scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-pe-headline md:text-5xl">
          {t.team.title}
        </h2>
        <h3 className="mt-10 text-lg font-bold text-pe-headline">{t.team.developers}</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => {
            if (member.name === "") throw new Error("team member name is empty")
            return (
              <li key={member.name} className="pe-card bg-white px-5 py-5">
                <p className="text-lg font-bold text-pe-headline">{member.name}</p>
                {member.role === "" ? null : <p className="mt-2 text-sm text-pe-body">{member.role}</p>}
                {member.affiliation === "" ? null : (
                  <p className="mt-1 text-sm text-pe-body">{member.affiliation}</p>
                )}
                {member.link === "" ? null : (
                  <a href={member.link} className="mt-3 inline-block text-sm font-semibold text-pe-green">
                    {member.link}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
        <h3 className="mt-12 text-lg font-bold text-pe-headline">{t.team.institutions}</h3>
        {/* Empty institutions is the current record. The pending line is that state. */}
        {institutions.length === 0 ? (
          <p className="mt-3 text-base text-pe-nav">{t.team.pending}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {institutions.map((name) => (
              <li key={name} className="text-base text-pe-headline-2">
                {name}
              </li>
            ))}
          </ul>
        )}
        <h3 className="mt-12 text-lg font-bold text-pe-headline">{t.team.contact}</h3>
        <p className="mt-3">
          <a href={GITHUB_ORG_URL} target="_blank" rel="noreferrer" className="font-semibold text-pe-green">
            {t.team.github}
          </a>
        </p>
        {/* An empty contactEmail stays off the page until a real address is written in team.ts. */}
        {contactEmail === "" ? null : (
          <p className="mt-2">
            <a href={`mailto:${contactEmail}`} className="font-semibold text-pe-green">
              {contactEmail}
            </a>
          </p>
        )}
      </div>
    </section>
  )
}
