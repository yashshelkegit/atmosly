

type MissionItem = {
    id: string;
    name: string;
    success: boolean;
    date_utc: string;
}

const MissionItem = ({name, success, date_utc}: MissionItem) => {
    return (
        <div className={`p-4 border ${success ? "border-gray-500" : "border-red-500"}`}>
            <p>{name}</p>
            <p>{success ? "Success" : "Failed"}</p>
            <p>{date_utc.split("T")[0]}</p>
        </div>
    )
}

export default MissionItem;