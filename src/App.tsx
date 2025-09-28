import "./App.css";
import MissionList from "./components/MissionList";
import Toolbar from "./components/Toolbar";
import ThemeProvider from "./context/ThemeProvider";

function App() {
	return (
		<>
			<div className="container mx-auto">
				<ThemeProvider>
					<Toolbar />
					<MissionList />
				</ThemeProvider>
			</div>
		</>
	);
}

export default App;
