import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import styles from "./ThemeCard.module.css";

const ThemeCard = (props) => {
  const { theme } = props;
  const inputRef = useRef();

  const selectThemeHandler = () => {
    inputRef.current.checked = true;
    props.onSelect(theme);
  };

  return (
    <Card
      onClick={selectThemeHandler}
      style={props.style}
      className={styles.card}
    >
      <Card.Header className={styles.header}>{theme.name}</Card.Header>
      <Card.Body className={styles.colors}></Card.Body>
      <Card.Footer className="d-flex justify-content-center ">
        <input
          className="form-check-input"
          type="radio"
          name="themeSelection"
          id={theme.name}
          value={theme.name}
          ref={inputRef}
          defaultChecked={props.checked}
        />
      </Card.Footer>
    </Card>
  );
};

export default ThemeCard;
