import { useEffect, useState } from "react";
import themes from "../constants/Themes.json";

const useTheme = () => {
  const [theme, setTheme] = useState(themes.data[0]);

  const changeTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme-preference", theme.name);
  };

  const findTheme = (name) => {
    return themes.data.find(
      (theme) => theme.name.toLowerCase() === name.toLowerCase()
    );
  };

  useEffect(() => {
    const themePrefName = localStorage.getItem("theme-preference");
    let themePref;
    if (themePrefName) themePref = findTheme(themePrefName);

    if (themePref) {
      setTheme(themePref);
    } else {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const darkTheme = findTheme("Dark");
      const lightTheme = findTheme("Light");
      const fallBackTheme = themes.data[0];

      if (darkModeQuery.matches && darkTheme) setTheme(darkTheme);
      else if (lightTheme) setTheme(lightTheme);
      else if (fallBackTheme) setTheme(fallBackTheme);
    }

    // Add styles to html
    const htmlElement = document.documentElement;
    Object.entries(theme.styles).forEach(([key, value]) => {
      htmlElement.style.setProperty(key, value);
    });
  }, [theme]);

  return [theme, changeTheme, themes];
};

export default useTheme;
