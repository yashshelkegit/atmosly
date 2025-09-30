import "./App.css";
import MissionList from "./components/MissionList";
import Toolbar from "./components/Toolbar";
import ThemeProvider from "./context/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MissionDetails from "./components/MissionDetails";
import useTheme from "./hooks/useTheme"; 

function AppContent() {
  const { theme } = useTheme(); 

  return (
	<div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
    <div className={`container mx-auto`}>
      <Toolbar />
      <Routes>
        <Route path="/atmosly" element={<MissionList />} />
        <Route path="/atmosly/:id" element={<MissionDetails />} />
      </Routes>
    </div>
	</div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
