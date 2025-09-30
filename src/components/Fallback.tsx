
type FallbackProps = {
  message: string
}   

const Fallback = ({message}: FallbackProps) => {
  return (
    <div className="flex justify-center items-center h-96">
      <p>{message}</p>
    </div>
  )
}

export default Fallback
