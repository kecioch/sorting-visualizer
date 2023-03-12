import React, { useContext } from "react";
import ThemeCard from "./ThemeCard";
import { ThemeContext } from "../../contexts/ThemeContext";

const ThemeSelector = () => {
  const { theme, setTheme, themes } = useContext(ThemeContext);

  const themeCards = themes.data.map((item, i) => (
    <ThemeCard
      key={i}
      theme={item}
      style={item.styles}
      onSelect={(theme) => setTheme(theme)}
      checked={item.name === theme.name}
    />
  ));

  return (
    <div className="d-flex gap-3 flex-row justify-content-center flex-wrap">
      {themeCards}
    </div>
  );
};

export default ThemeSelector;
