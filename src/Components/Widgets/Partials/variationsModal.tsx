import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import AlertBox from "../../AlertBox";

interface ModalProps {
  showModal: any;
  handleCloseModal: any;
  handleSort: any;
  filteredColumns: any;
}

interface SortLevel {
  column: string;
  order: string;
}

const VariationsModalComponent = ({
  showModal,
  handleCloseModal,
  handleSort,
  filteredColumns,
}: ModalProps) => {
  const [sortLevels, setSortLevels] = useState<SortLevel[]>([
    { column: filteredColumns?.[0]?.id || "", order: "asc" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  const addLevel = () => {
    if (sortLevels.length < filteredColumns.length) {
      setSortLevels([
        ...sortLevels,
        { column: filteredColumns?.[0]?.id || "", order: "asc" },
      ]);
    }
  };

  const deleteLevel = () => {
    if (sortLevels.length > 1) {
      setSortLevels(sortLevels.slice(0, -1));
    }
  };

  const handleSortChange = (
    index: number,
    field: keyof SortLevel,
    value: string
  ) => {
    const newSortLevels = [...sortLevels];
    newSortLevels[index][field] = value;
    setSortLevels(newSortLevels);
  };

  const hasDuplicateColumns = (sortLevels: SortLevel[]) => {
    const seenColumns = new Set<string>();
    for (const level of sortLevels) {
      if (seenColumns.has(level.column)) {
        return true;
      }
      seenColumns.add(level.column);
    }
    return false;
  };

  const handleSorting = () => {
    if (hasDuplicateColumns(sortLevels)) {
      setErrorMessage("Please remove or change any duplicate column.");
    } else {
      setErrorMessage("");
      handleCloseModal();
      handleSort(sortLevels);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} className="modal-filter">
      <Modal.Header closeButton>
        <Modal.Title>Multiple Sort</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage && <AlertBox text={errorMessage} />}
        <div className="d-flex gap-3 align-items-center mt-2">
          <button className="transparent-btn" onClick={addLevel}>
            Add Level
          </button>
          <button
            className={`transparent-btn ${
              sortLevels?.length > 1 ? "" : "disabled-button"
            }`}
            onClick={deleteLevel}
            disabled={sortLevels?.length > 1 ? false : true}
          >
            Delete Level
          </button>
        </div>
        <div className="fixed-table-container mt-2">
          <table id="multi-sort" className="table">
            <thead>
              <tr>
                <th></th>
                <th>
                  <div className="th-inner">Column</div>
                </th>
                <th>
                  <div className="th-inner">Order</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortLevels.map((level, index) => (
                <tr key={index}>
                  <td>{index === 0 ? "Sort by" : "Then by"}</td>
                  <td>
                    <select
                      className="btn-group dropdown multi-sort-name form-control form-select-select"
                      value={level.column}
                      onChange={(e) =>
                        handleSortChange(index, "column", e.target.value)
                      }
                    >
                      {filteredColumns.map((column: any) => (
                        <option key={column.id} value={column.id}>
                          {column.Header}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="btn-group dropdown multi-sort-order form-control form-select-select"
                      value={level.order}
                      onChange={(e) =>
                        handleSortChange(index, "order", e.target.value)
                      }
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end align-items-center gap-2">
          <button className="transparent-btn" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="btn-refresh seller-btn" onClick={handleSorting}>
            Sort
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default VariationsModalComponent;
