
type ErrorProps = {
  message: string
}   

const Error = ({message}: ErrorProps) => {
  return (
    <div>
      {message && <p>{message}</p>}
      {!message && <p>Something went wrong</p>}
    </div>
  )
}

export default Error
