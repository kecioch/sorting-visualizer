import styles from "./Bar.module.css";

const Bar = (props) => {
  const height = props.barData.value + "%";
  const classes = `${styles.bar} ${styles[props.barData.status]}`;

  return <div className={classes} style={{ height }}></div>;
};

export default Bar;
