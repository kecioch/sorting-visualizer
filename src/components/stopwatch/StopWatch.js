import { useEffect, useState } from "react";
import styles from "./StopWatch.module.css";

const StopWatch = (props) => {
  const [time, setTime] = useState(0);
  const [referenceTime, setReferenceTime] = useState();
  const { isRunning } = props;

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      setTime(0);
      setReferenceTime(Date.now());
      intervalId = setInterval(() => setTime(Date.now() - referenceTime), 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, referenceTime]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time - minutes * 60000) / 1000);
    const milliseconds = Math.floor(
      (time - minutes * 60000 - seconds * 1000) / 10
    );
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds +
      ":" +
      (milliseconds < 10 ? "0" : "") +
      milliseconds
    );
  };

  return <h2 className={styles.stopwatch}>{formatTime(time)}</h2>;
};

export default StopWatch;
