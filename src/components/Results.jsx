import SkillGap from './SkillGap'
import Roadmap from './Roadmap'
import Resources from './Resources'
import JobPostings from './JobPostings'
import WaveDivider from './WaveDivider'

export default function Results({ data }) {
  return (
    <div>
      <WaveDivider fillTop="#F5E6D3" fillBottom="#FFF8F0" />
      <SkillGap data={data.skillGap} />
      <WaveDivider fillTop="#FFF8F0" fillBottom="#F5E6D3" />
      <Roadmap
        data={{
          ...data.roadmap,
          currentRole: data.currentRole,
          dreamRole: data.dreamRole,
        }}
      />
      <WaveDivider fillTop="#F5E6D3" fillBottom="#FFF8F0" />
      <Resources data={data.resources} />
      <WaveDivider fillTop="#FFF8F0" fillBottom="#F5E6D3" />
      <JobPostings data={data.jobPostings} />
    </div>
  )
}
