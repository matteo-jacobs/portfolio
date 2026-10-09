import './TitleFrame.css'

// A rectangle where the top-left corner stays put and the other three corners
// are nudged inward, giving the slightly skewed "trapezoid" frame from Figma.
//
// Each corner is [x, y] in px, measured inward from that corner:
//   topRight={[6, 4]}  -> top-right point moves 6px left and 4px down
//
// Usage:
//   <TitleFrame><h1>About me</h1></TitleFrame>
//   <TitleFrame color="var(--black)" topRight={[10, 0]} bottomLeft={[0, 8]}>
//     <h2 style={{ color: 'var(--white)' }}>Fun fact</h2>
//   </TitleFrame>
export default function TitleFrame({
  as: Tag = 'div',
  color = 'var(--red)',
  topRight = [8, 4],
  bottomRight = [4, 6],
  bottomLeft = [6, 2],
  className = '',
  style,
  children,
  ...rest
}) {
  const frameStyle = {
    ...style,
    '--frame-color': color,
    '--frame-tr-x': `${topRight[0]}px`,
    '--frame-tr-y': `${topRight[1]}px`,
    '--frame-br-x': `${bottomRight[0]}px`,
    '--frame-br-y': `${bottomRight[1]}px`,
    '--frame-bl-x': `${bottomLeft[0]}px`,
    '--frame-bl-y': `${bottomLeft[1]}px`,
  }

  return (
    <Tag className={`title-frame ${className}`} style={frameStyle} {...rest}>
      {children}
    </Tag>
  )
}
