import { useId } from 'react'
import { lerp, randomFrom } from '../utils/seededRandom.js'
import './TitleFrame.css'

// A rectangle where the top-left corner stays put and the other three corners
// are nudged inward, giving the slightly skewed "trapezoid" frame from Figma.
//
// Every frame gets its own shape: the corners are picked "randomly" from the
// ranges below, seeded by React's useId, so a frame looks the same on every
// render but no two frames on a page are identical.
//
// You can still fix a corner yourself, as [x, y] in px measured inward:
//   topRight={[6, 4]}  -> top-right point moves 6px left and 4px down
//
// Usage:
//   <TitleFrame><h1>About me</h1></TitleFrame>
//   <TitleFrame color="var(--black)" topRight={[10, 0]} bottomLeft={[0, 8]}>
//
// padding={[y, x]} in px sets the space around the content (default 0.5em 1em).
// The corner offsets are added on top automatically.

// How far each corner may move inward. Each value is
// max(px, em): px keeps small buttons visibly slanted, em makes big titles
// slant in proportion. [min, max] for both.
const CORNER_RANGES = {
  tr: { x: { px: [3, 12], em: [0.04, 0.22] }, y: { px: [0, 6], em: [0, 0.1] } },
  br: { x: { px: [0, 8], em: [0, 0.15] }, y: { px: [2, 8], em: [0.02, 0.12] } },
  bl: { x: { px: [0, 8], em: [0, 0.15] }, y: { px: [0, 5], em: [0, 0.1] } },
}

function randomOffset(range, random) {
  const t = random()
  return `max(${lerp(range.px, t).toFixed(1)}px, ${lerp(range.em, t).toFixed(3)}em)`
}

const px = (value) => `${value}px`

export default function TitleFrame({
  as: Tag = 'div',
  color = 'var(--red)',
  topRight,
  bottomRight,
  bottomLeft,
  padding,
  className = '',
  style,
  children,
  ...rest
}) {
  const random = randomFrom(useId())
  const corner = (fixed, range) =>
    fixed
      ? [px(fixed[0]), px(fixed[1])]
      : [randomOffset(range.x, random), randomOffset(range.y, random)]

  const [trX, trY] = corner(topRight, CORNER_RANGES.tr)
  const [brX, brY] = corner(bottomRight, CORNER_RANGES.br)
  const [blX, blY] = corner(bottomLeft, CORNER_RANGES.bl)

  const frameStyle = {
    ...style,
    '--frame-color': color,
    '--frame-tr-x': trX,
    '--frame-tr-y': trY,
    '--frame-br-x': brX,
    '--frame-br-y': brY,
    '--frame-bl-x': blX,
    '--frame-bl-y': blY,
    ...(padding && {
      '--frame-pad-y': `${padding[0]}px`,
      '--frame-pad-x': `${padding[1]}px`,
    }),
  }

  return (
    <Tag className={`title-frame ${className}`} style={frameStyle} {...rest}>
      {children}
    </Tag>
  )
}
