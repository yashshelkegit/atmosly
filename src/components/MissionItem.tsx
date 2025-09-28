

type MissionItem = {
    id: string;
    name: string;
    success: boolean;
}

const MissionItem = ({name, success}: MissionItem) => {
    return (
        <div className={`p-4 border ${success ? "border-gray-500" : "border-red-500"}`}>
            <p>{name}</p>
            <p>{success ? "Success" : "Failed"}</p>
        </div>
    )
}

export default MissionItem;