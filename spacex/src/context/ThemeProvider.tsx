import {createContext, useState} from "react"


type Theme = "light" | "dark";
type ThemeState = {
    theme: Theme,
    setTheme : React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = createContext<ThemeState | undefined>(undefined);

function ThemeProvider({children}: {children: React.ReactNode}){

    const [theme, setTheme] = useState<Theme>("light");

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;
export {ThemeContext};