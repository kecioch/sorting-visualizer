import React from "react";
import useTheme from "../hooks/useTheme";

const ThemeContext = React.createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme, themes] = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
