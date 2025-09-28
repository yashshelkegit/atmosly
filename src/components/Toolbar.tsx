import { useState } from "react";
import SettingsModal from "./SettingsModal";

const Toolbar = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
        <div className="flex justify-between items-center p-4 border-b-2 border-gray-300 mb-4">
            <h1 className="text-5xl">
                SapceX
            </h1>
            <div>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowModal(!showModal)}>
                    Settings
                </button>
            </div>
            {showModal && <SettingsModal setShowModal={setShowModal}/>}
        </div>
        </>
    )
}

export default Toolbar