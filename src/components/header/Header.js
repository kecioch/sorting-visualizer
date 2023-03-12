import styles from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { InfoCircleFill, GearFill } from "react-bootstrap-icons";
import { useRef } from "react";

const Header = (props) => {
  const options = props.options;
  const delayRef = useRef(options.delay.startIndex);
  const sizeRef = useRef(options.size.startIndex);

  const sortingStatus = props.config.sorting;

  const algorithmOptions = options.algorithms.values.map((item, i) => {
    return (
      <option key={i} value={item}>
        {item}
      </option>
    );
  });

  const onChangeAlgorithmHandler = (e) => {
    props.onChangeAlgorithm(e.target.value);
  };

  const onChangeSizeHandler = (e) => {
    const size = options.size.values[e.target.value];
    props.onChangeSize(size);
  };

  const onChangeDelayHandler = (e) => {
    const delay = options.delay.values[e.target.value];
    props.onChangeDelay(delay);
  };

  return (
    <Navbar
      className={styles.header}
      variant="dark"
      collapseOnSelect
      expand="lg"
    >
      <Container className={styles.container}>
        <Navbar.Brand className={styles.brand}>Sorting Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" color="light" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className={styles.content}>
            <Form.Select
              className={`${styles.select} ${styles.dropdown}`}
              onChange={onChangeAlgorithmHandler}
              disabled={sortingStatus}
              defaultValue={options.algorithms.values[options.algorithms.startIndex]}
            >
              {algorithmOptions}
            </Form.Select>
            <section className={styles.sliderContainer}>
              <label htmlFor="size">Size</label>
              <input
                id="size"
                type="range"
                min={0}
                max={options.size.values.length - 1}
                step={1}
                onChange={onChangeSizeHandler}
                defaultValue={options.size.startIndex}
                ref={sizeRef}
                disabled={sortingStatus}
              />
              <label htmlFor="size" type="range">
                {options.size.values[sizeRef.current.value]}
              </label>
            </section>
            <section className={styles.sliderContainer}>
              <label htmlFor="delay" type="range">
                Delay
              </label>
              <input
                id="delay"
                type="range"
                min={0}
                max={options.delay.values.length - 1}
                step={1}
                onChange={onChangeDelayHandler}
                defaultValue={options.delay.startIndex}
                ref={delayRef}
              />
              <label htmlFor="delay" type="range">
                {`${options.delay.values[delayRef.current.value]}ms`}
              </label>
            </section>
            <Button
              variant="primary"
              onClick={props.onRandomize}
              disabled={sortingStatus}
            >
              Randomize
            </Button>
            <Button
              variant={sortingStatus ? "danger" : "primary"}
              onClick={sortingStatus ? props.onStop : props.onStart}
            >
              {sortingStatus ? "Stop" : "Start"}
            </Button>
            <section className={styles.icons}>
              <InfoCircleFill size={25} onClick={props.onOpenInfo} />
              <GearFill size={25} onClick={props.onOpenSettings} />
            </section>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
