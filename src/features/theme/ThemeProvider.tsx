import {createContext, PropsWithChildren, useCallback, useContext, useState} from "react";

type ThemeVariant = "success" | "failure" | "light" | "dark";

const ThemeContext = createContext<{
    theme: ThemeVariant;
    setTheme: (next: ThemeVariant) => void
}>({
    theme: "light",
    setTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export type ThemeProviderProps = object
export const ThemeProvider = (props: PropsWithChildren<ThemeProviderProps>) => {
    const {children} = props;
    const [theme, setTheme] = useState<ThemeVariant>("light");

    const handleSetTheme = useCallback((next: ThemeVariant) => {
        setTheme(next)
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
