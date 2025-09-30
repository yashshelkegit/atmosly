
type LoadingProps = {
  message?: string;
};

const Loading = ({ message }: LoadingProps) => {
  return (
    <div className="flex justify-center items-center h-96">
      {message && <p>{`${message}....`}</p>}
      {!message && <p>Loading....</p>}
    </div>
  )
}

export default Loading
