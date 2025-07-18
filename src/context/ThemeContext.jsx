import {
    createContext,
    useContext,
    useState
} from "react";

// this is a context

export const ThemeContext = createContext();

// this is a provider in all components in shared data 
export const ThemeProvider = ({
    children
}) => {
    const [theme, setTheme] = useState(false);

    const toggleHandler = () => {
        setTheme(!theme);
    }

    return (<ThemeContext value={{ theme, toggleHandler }}>
        {children}
    </ThemeContext>)
}

// this is a consumer
export const useTheme = () => useContext(ThemeContext);