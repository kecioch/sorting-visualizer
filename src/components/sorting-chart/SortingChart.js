import Bar from "./Bar";
import styles from "./SortingChart.module.css";

const SortingChart = (props) => {
  const bars = props.data.map((item, i) => {
    return <Bar key={i} barData={item} />;
  });

  const classes = `${styles.chart} ${props.isSorting && styles.noTransition}`;

  return <div className={classes}>{bars}</div>;
};

export default SortingChart;
