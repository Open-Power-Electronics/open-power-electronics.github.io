import { useId, useState, type CSSProperties, type PointerEvent } from "react"
import { MAP_SIZE, schools, teamMembers, type SchoolId, type TeamMember } from "@/content/team.ts"
import { useI18n } from "@/i18n/I18nContext.tsx"
import { ChapterSection, SectionHeader } from "./primitives.tsx"
import "./team.css"

const schoolIds = Object.keys(schools) as SchoolId[]
const labelLayouts = ["wide", "compact"] as const

type TeamHover = {
  schools: readonly SchoolId[]
  member?: TeamMember
}

const trunkPaths = [
  "M201.4 179 226.4 154H271L294 131H323L351.5 159.5V165.1",
  "M212.6 190.8H239L273 224.8H312L351.5 185.3V165.1",
  "M351.5 165.1H400L456 109.1H502L515 122.1H546.3L547.4 123.2 561.3 137.1 576.1 136.9",
  "M576.1 136.9H610L642 168.9H710L748 206.9H841L867 180.9H890.7L912.1 202.3",
]

function mapPosition(school: (typeof schools)[SchoolId]): CSSProperties {
  const { wide, compact } = school
  return {
    "--label-x": wide.terminal[0] / MAP_SIZE.width * 100 + "%",
    "--label-y": wide.terminal[1] / MAP_SIZE.height * 100 + "%",
    "--label-compact-x": compact.terminal[0] / MAP_SIZE.width * 100 + "%",
    "--label-compact-y": compact.terminal[1] / MAP_SIZE.height * 100 + "%",
  } as CSSProperties
}

function MapRoutes({ activeSchools }: { activeSchools: readonly SchoolId[] }) {
  return (
    <svg className="team-routes" viewBox={"0 0 " + MAP_SIZE.width + " " + MAP_SIZE.height} aria-hidden="true">
      <defs>
        <filter id="team-logo-ink" colorInterpolationFilters="sRGB">
          <feFlood floodColor="var(--team-signal)" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="team-logo-crest" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          {/* Ink, midtone green, and warm paper retain the heraldic detail. */}
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.071 0.102 0.259 0.588 0.945" />
            <feFuncG type="table" tableValues="0.267 0.361 0.494 0.733 0.937" />
            <feFuncB type="table" tableValues="0.133 0.184 0.314 0.624 0.922" />
          </feComponentTransfer>
        </filter>
      </defs>
      <g className="team-traces">
        {trunkPaths.map((path, index) => (
          <path key={path} d={path} pathLength="1" style={{ "--route-delay": index * 0.06 } as CSSProperties} />
        ))}
      </g>
      {schoolIds.map((id) => {
        const { pad } = schools[id]
        return (
          <g key={id} className="team-route-leader" data-active={activeSchools.includes(id) || undefined}>
            {labelLayouts.map((layout) => {
              const { lead, terminal } = schools[id][layout]
              return (
                <g className={"team-lead-" + layout} key={layout}>
                  <path className="team-lead-base" d={lead} />
                  <path className="team-lead-pulse" d={lead} pathLength="1" />
                  <circle className="team-lead-terminal" cx={terminal[0]} cy={terminal[1]} r="2.4" />
                </g>
              )
            })}
            <circle cx={pad[0]} cy={pad[1]} r="12" className="team-route-halo" />
            <circle cx={pad[0]} cy={pad[1]} r="5.8" className="team-route-ring" />
            <circle cx={pad[0]} cy={pad[1]} r="3.3" className="team-route-pad" />
          </g>
        )
      })}
    </svg>
  )
}

export function Team() {
  const { lang, t } = useI18n()
  const team = t.team
  const affiliationId = useId()
  const [hovered, setHovered] = useState<TeamHover | null>(null)
  const [focusedMember, setFocusedMember] = useState<TeamMember | null>(null)
  const activeMember = hovered ? hovered.member : focusedMember
  const activeSchools = hovered?.schools ?? focusedMember?.schools ?? []

  function updateHover(event: PointerEvent, next: TeamHover | null) {
    if (event.pointerType === "mouse") setHovered(next)
  }

  return (
    <ChapterSection chapter="team" className="circuit-field team-section">
      <div className="container-page">
        <SectionHeader chapter="team" title={team.title} lede={team.lede} />
        <figure className="team-map" data-scroll-stage="">
          <div className="team-map-graphic">
            <div className="team-map-sheet">
              <img
                className="team-map-image"
                src="/media/team-circuit-map.svg"
                alt=""
                width={MAP_SIZE.width}
                height={MAP_SIZE.height}
                loading="lazy"
                decoding="async"
              />
              <MapRoutes activeSchools={activeSchools} />
              <ul className="team-map-labels" role="list" aria-label={team.institutions}>
                {schoolIds.map((id) => (
                  <li key={id} style={mapPosition(schools[id])}>
                    <span
                      className="team-map-label"
                      data-school={id}
                      data-dock={schools[id].dock}
                      data-active={activeSchools.includes(id) || undefined}
                      onPointerEnter={(event) => updateHover(event, { schools: [id] })}
                      onPointerLeave={(event) => updateHover(event, null)}
                    >
                      <img className="team-map-logo" src={schools[id].logo} alt="" width={18} height={18} loading="lazy" />
                      <span className="team-map-school-name">{team.schoolNames[id].join("\n")}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <figcaption className="team-credits">
            <ul role="list" aria-label={team.core}>
              {teamMembers.map((member, index) => {
                const active = activeMember
                  ? activeMember === member
                  : member.schools.some((id) => activeSchools.includes(id))

                return (
                  <li key={member.name}>
                    <a
                      className="team-credit-name"
                      href={member.homepage}
                      aria-describedby={`${affiliationId}-${index}`}
                      data-active={active || undefined}
                      onPointerEnter={(event) => updateHover(event, { schools: member.schools, member })}
                      onPointerLeave={(event) => updateHover(event, null)}
                      onFocus={(event) => {
                        if (event.currentTarget.matches(":focus-visible")) setFocusedMember(member)
                      }}
                      onBlur={() => setFocusedMember(null)}
                    >
                      {lang === "zh" ? member.nameZh : member.name}
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="team-credit-affiliations">
              {teamMembers.map((member, index) => (
                <span
                  key={member.name}
                  id={`${affiliationId}-${index}`}
                  data-visible={activeMember === member || undefined}
                >
                  {member.schools.map((id) => team.schoolNames[id].join(lang === "zh" ? "" : " ")).join(" · ")}
                </span>
              ))}
            </div>
          </figcaption>
        </figure>
      </div>
    </ChapterSection>
  )
}
