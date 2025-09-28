
type FallbackProps = {
  message: string
}   

const Fallback = ({message}: FallbackProps) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

export default Fallback
