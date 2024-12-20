import React from "react";
import Modal from "react-bootstrap/Modal";
import { IoMdClose } from "react-icons/io";
const ConfirmationModal = ({
  modalShow,
  modalClose,
  onConfirm,
  loadingRowsDelete,
}: any) => {
  return (
    <div>
      <Modal
        show={modalShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-filter confirmation-modal"
      >
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Delete
          </Modal.Title>
          <IoMdClose
            color="#fff"
            size={20}
            onClick={modalClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body>
          <h4 className="mt-2">Are you sure?</h4>
          <p className="mt-2" style={{fontSize: "14px"}}>Do you really want to delete this file?</p>
          <div className="d-flex justify-content-end gap-2 mb-2">
            <button
              className="btn btn-secondary"
              onClick={modalClose}
              disabled={loadingRowsDelete}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={loadingRowsDelete}
            >
              {loadingRowsDelete ? "Loading..." : "Delete"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
