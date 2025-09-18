import {
    createContext,
    useContext,
    useState
} from "react";


export const ThemeContext = createContext();

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

export const useTheme = () => useContext(ThemeContext);