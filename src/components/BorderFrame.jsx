import './BorderFrame.css'

// Wraps an image (or anything) and draws two slanted color corners over it:
// one in the top-left, one in the bottom-right, like the project cards.
//
// Each corner runs along a horizontal edge and down/up a vertical edge.
// The horizontal side is always the longer one, and both end inside the
// picture. Every BorderFrame has the same shape, so they look consistent
// across the site.
//
// Usage:
//   <BorderFrame color="var(--red)">
//     <img src={photo} alt="" />
//   </BorderFrame>
//
// Change a corner with { length, ratio, inner } (any you leave out keep the
// default below):
//   length  how far it runs along the horizontal edge, in % of the width
//   ratio   horizontal ÷ vertical side (above 1 = horizontal is longer)
//   inner   [x, y] of the inner point, in % of the corner's own box
//           (from its top-left). The closer it is to the frame's corner,
//           the slimmer the corner: small for topLeft, large for bottomRight
//   <BorderFrame topLeft={{ length: 70 }}>

// The bottom-right shape keeps the project cards' arrow inside the red:
// check the arrow's position (.project-card__arrow) when changing it.
const DEFAULT_CORNERS = {
  topLeft: { length: 80, ratio: 4, inner: [11, 34] },
  bottomRight: { length: 72, ratio: 2.2, inner: [86, 70] },
}

function cornerVars(prefix, { length, ratio, inner }) {
  return {
    [`--${prefix}-length`]: `${length}%`,
    [`--${prefix}-ratio`]: ratio,
    [`--${prefix}-inner-x`]: `${inner[0]}%`,
    [`--${prefix}-inner-y`]: `${inner[1]}%`,
  }
}

export default function BorderFrame({
  as: Tag = 'div',
  color = 'var(--red)',
  topLeft,
  bottomRight,
  className = '',
  style,
  children,
  ...rest
}) {
  const frameStyle = {
    ...style,
    '--border-frame-color': color,
    ...cornerVars('tl', { ...DEFAULT_CORNERS.topLeft, ...topLeft }),
    ...cornerVars('br', { ...DEFAULT_CORNERS.bottomRight, ...bottomRight }),
  }

  return (
    <Tag className={`border-frame ${className}`} style={frameStyle} {...rest}>
      {children}
    </Tag>
  )
}
