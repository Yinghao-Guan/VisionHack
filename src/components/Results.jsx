import SkillGap from './SkillGap'
import Roadmap from './Roadmap'
import Resources from './Resources'
import JobPostings from './JobPostings'

export default function Results({ data }) {
  const userSkills = data.skillGap.have.map((s) => s.name)

  return (
    <div>
      <SkillGap data={data.skillGap} />

        {/* Section divider */}
        <div className="flex items-center justify-center h-16">
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        </div>

        <Roadmap
          data={{
            ...data.roadmap,
            currentRole: data.currentRole,
            dreamRole: data.dreamRole,
          }}
        />

        <div className="flex items-center justify-center h-16">
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        </div>

        <Resources data={data.resources} />

        <div className="flex items-center justify-center h-16">
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        </div>

        <JobPostings data={data.jobPostings} userSkills={userSkills} />
    </div>
  )
}
