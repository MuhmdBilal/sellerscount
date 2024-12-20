import React from "react";
import Modal from "react-bootstrap/Modal";
import { IoMdClose } from "react-icons/io";
import Widgets from "../../Widgets";

const OverviewModal = ({ show, setShow, setSearchValue, searchValue }: any) => {
  return (
    <div>
      <Modal
        show={show}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className="modal-filter-overview"
      >
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title id="example-custom-modal-styling-title">
            ASIN : {searchValue}
          </Modal.Title>
          <IoMdClose
            color="#fff"
            size={20}
            onClick={() => {
              setShow(false);
              setSearchValue("");
            }}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body>
          <Widgets searchResult={searchValue} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OverviewModal;
