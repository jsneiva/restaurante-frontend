
export default function Loading(props) {
  return (
    <div className={'ball-pulse-rise' + (props.isFull ? ' is-full' : '')}>
      <div></div><div></div><div></div><div></div><div></div>
    </div>
  )
}