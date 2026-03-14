import SkillGap from './SkillGap'
import Roadmap from './Roadmap'
import Resources from './Resources'
import JobPostings from './JobPostings'
import WaveDivider from './WaveDivider'

export default function Results({ data }) {
  return (
    <div>
      <WaveDivider fillTop="#111827" fillBottom="#0a0a0f" />
      <SkillGap data={data.skillGap} />
      <WaveDivider fillTop="#0a0a0f" fillBottom="#111827" />
      <Roadmap
        data={{
          ...data.roadmap,
          currentRole: data.currentRole,
          dreamRole: data.dreamRole,
        }}
      />
      <WaveDivider fillTop="#111827" fillBottom="#0a0a0f" />
      <Resources data={data.resources} />
      <WaveDivider fillTop="#0a0a0f" fillBottom="#111827" />
      <JobPostings data={data.jobPostings} />
    </div>
  )
}
