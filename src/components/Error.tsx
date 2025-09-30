
type ErrorProps = {
  message: string
}   

const Error = ({message}: ErrorProps) => {
  return (
    <div className="flex justify-center items-center h-96">
      {message && <p>{message}</p>}
      {!message && <p>Something went wrong</p>}
    </div>
  )
}

export default Error
