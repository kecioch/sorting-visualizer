import Modal from "react-bootstrap/Modal";
import React from "react";
import ThemeSelector from "../theme-selector/ThemeSelector";

const SettingsModal = (props) => {
  return (
    <Modal show={true} size="lg" onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select A Theme</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ThemeSelector />
      </Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
