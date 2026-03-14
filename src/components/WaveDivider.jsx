export default function WaveDivider({ fillTop = '#FFF8F0', fillBottom = '#FFF8F0', flip = false }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px] block"
      >
        <path
          d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
          fill={fillBottom}
        />
        <path
          d="M0,0 L0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,0 Z"
          fill={fillTop}
        />
      </svg>
    </div>
  )
}
