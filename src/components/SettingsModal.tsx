import React from "react";
import useTheme from "../hooks/useTheme";

type SettingsModalProps = {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsModal = ({ setShowModal }: SettingsModalProps) => {
	const { theme, setTheme } = useTheme();
	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}
	return (
		<div
			className="fixed h-full w-full top-0 left-0 bg-black/30 bg-opacity-50 grid place-items-center"
			onClick={() => {
				setShowModal(false);
			}}
		>
			<div
				className={`border p-4 w-1/2 h-1/2 ${
					theme === "dark"
						? "bg-gray-800 text-white border-gray-600"
						: "bg-white text-black border-gray-300"
				}`}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="flex justify-between items-center mb-4">
					<h1>Configurations</h1>
					<button
						onClick={() => {
							setShowModal(false);
						}}
					>
						Close
					</button>
				</div>
				<div>
					<button onClick={toggleTheme}>
						{theme === "light" ? "dark" : "light"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SettingsModal;
