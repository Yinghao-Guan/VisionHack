const presets = {
  footer: { position: 'bottom', strength: 3, height: '12rem' },
  header: { position: 'top', strength: 3, height: '8rem' },
}

export default function GradualBlur({
  preset,
  position: positionProp = 'bottom',
  strength: strengthProp = 3,
  height: heightProp = '12rem',
  layers = 6,
}) {
  const config = preset ? { ...presets[preset] } : {}
  const position = config.position || positionProp
  const strength = config.strength || strengthProp
  const height = config.height || heightProp

  const isTop = position === 'top'

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        [isTop ? 'top' : 'bottom']: 0,
        height,
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      {Array.from({ length: layers }).map((_, i) => {
        const ratio = i / (layers - 1)
        const blurValue = Math.round(Math.pow(ratio, 2) * strength * 10) / 10

        // Each layer covers a portion of the gradient
        const maskDirection = isTop ? 'to bottom' : 'to top'
        const start = (i / layers) * 100
        const end = ((i + 1) / layers) * 100

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: `blur(${blurValue}px)`,
              WebkitBackdropFilter: `blur(${blurValue}px)`,
              maskImage: `linear-gradient(${maskDirection}, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${end}%)`,
              WebkitMaskImage: `linear-gradient(${maskDirection}, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${end}%)`,
            }}
          />
        )
      })}
    </div>
  )
}
