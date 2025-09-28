
type LoadingProps = {
  message: string | undefined
}   

const Loading = ({message}: LoadingProps) => {
  return (
    <div>
      {message && <p>{`${message}....`}</p>}
      {!message && <p>Loading....</p>}
    </div>
  )
}

export default Loading
