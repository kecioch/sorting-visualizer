import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import { Github, ArrowRight } from "react-bootstrap-icons";
import styles from "./InfoModal.module.css";
import Bar from "../sorting-chart/Bar";

const InfoModal = (props) => {
  return (
    <React.Fragment>
      <Modal show={true} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item className={styles.listItem}>
              <div className={styles.example}>
                <Bar barData={{ value: 100, status: "unselected" }} />
                <Bar barData={{ value: 50, status: "unselected" }} />
                <Bar barData={{ value: 80, status: "unselected" }} />
                <Bar barData={{ value: 60, status: "unselected" }} />
              </div>
              <ArrowRight />
              <p>unselected</p>
            </ListGroup.Item>
            <ListGroup.Item className={styles.listItem}>
              <div className={styles.example}>
                <Bar barData={{ value: 100, status: "compared" }} />
                <Bar barData={{ value: 50, status: "compared" }} />
                <Bar barData={{ value: 80, status: "unselected" }} />
                <Bar barData={{ value: 60, status: "unselected" }} />
              </div>
              <ArrowRight />
              <p>compared</p>
            </ListGroup.Item>
            <ListGroup.Item className={styles.listItem}>
              <div className={styles.example}>
                <Bar barData={{ value: 100, status: "swap" }} />
                <Bar barData={{ value: 50, status: "swap" }} />
                <Bar barData={{ value: 80, status: "unselected" }} />
                <Bar barData={{ value: 60, status: "unselected" }} />
              </div>
              <ArrowRight />
              <p>swap</p>
            </ListGroup.Item>
            <ListGroup.Item className={styles.listItem}>
              <div className={styles.example}>
                <Bar barData={{ value: 100, status: "unselected" }} />
                <Bar barData={{ value: 50, status: "unselected" }} />
                <Bar barData={{ value: 80, status: "pivot" }} />
                <Bar barData={{ value: 60, status: "unselected" }} />
              </div>
              <ArrowRight />
              <p>pivot [quick sort]</p>
            </ListGroup.Item>
            <ListGroup.Item className={styles.listItem}>
              <div className={styles.example}>
                <Bar barData={{ value: 50, status: "sorted" }} />
                <Bar barData={{ value: 60, status: "sorted" }} />
                <Bar barData={{ value: 80, status: "sorted" }} />
                <Bar barData={{ value: 100, status: "sorted" }} />
              </div>
              <ArrowRight />
              <p>sorted</p>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between flex-row">
          <p className="text-muted">developed by Kevin Cioch</p>
          <Button
            variant="primary"
            title="github repository"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/kecioch/sorting-visualizer/"
          >
            <Github /> Github
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default InfoModal;
