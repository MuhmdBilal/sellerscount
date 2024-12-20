import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaListUl } from "react-icons/fa";
import { AiOutlineSortDescending } from "react-icons/ai";
import DataTable from "../../Datatable";
import VariationsModalComponent from "./variationsModal";

interface VariationsProps {
  variations?: any;
  columns: any;
  variationLoadings: any;
}

const Variations = ({
  variations,
  columns,
  variationLoadings,
}: VariationsProps) => {
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedColumn, setSortedColumn] = useState<any>("");
  const [filteredData, setFilteredData] = useState(variations);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedData, setSortedData] = useState(filteredData);
  const [showModal, setShowModal] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<any>({});

  useEffect(() => {
    if (columns && columns.length > 0) {
      const initialVisibleColumns = columns.reduce((acc: any, column: any) => {
        acc[column.id] = column.id !== "ASIN";
        return acc;
      }, {});
      setVisibleColumns(initialVisibleColumns);
    }
  }, [columns]);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    if (searchTerm) {
      const filtered = (variations || []).filter((item: any) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(variations || []);
    }
  }, [searchTerm, variations]);
  const handleSort = (column: any) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    const sorted = [...filteredData].sort((a, b) =>
      direction === "asc"
        ? a[column.id] > b[column.id]
          ? 1
          : -1
        : a[column.id] < b[column.id]
        ? 1
        : -1
    );
    setSortDirection(direction);
    setSortedColumn(column.id);
    setFilteredData(sorted);
  };

  const handleToggleColumn = (columnId: string, event: any) => {
    event.stopPropagation();
    setVisibleColumns((prevState: any) => ({
      ...prevState,
      [columnId]: !prevState[columnId],
    }));
  };

  const filteredColumns = columns.filter(
    (column: any) => visibleColumns[column.id]
  );
  return (
    <div id="variations">
      {/* <div className="d-flex justify-content-between align-items-center flex-wrap">
        <p className="seller-description vat-description mb-0">
          Review Percents
        </p>
        <button className="btn-refresh seller-btn">Check</button>
      </div> */}
      {variationLoadings ? (
        <div className="loading-buyBox" style={{ overflow: "hidden" }}></div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center gap-2 mt-2">
            <input
              type="search"
              className="input-group form-control inputs-search bar-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  className={`btn-refresh seller-btn filter-btn d-flex justify-content-center align-items-center ${
                    !filteredColumns.length && "cursor-not-allowed"
                  }`}
                  disabled={!filteredColumns.length}
                >
                  <FaListUl />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {columns.map((column: any) => (
                    <Dropdown.Item
                      key={column.id}
                      as="div"
                      className="d-flex align-items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={visibleColumns[column.id]}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleToggleColumn(column.id, e)}
                      />
                      {column.Header}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <button
                className={`btn-refresh ${
                  !filteredColumns.length
                    ? "analysis-btn-disable"
                    : "analysis-btn seller-btn"
                }`}
                onClick={() => handleShowModal()}
                disabled={!filteredColumns.length}
              >
                <AiOutlineSortDescending size={22} />
              </button>
            </div>
          </div>
          <div className="mt-2">
            <DataTable
              data={filteredData}
              columns={filteredColumns}
              handleSort={handleSort}
              sortDirection={sortDirection}
              sortedColumn={sortedColumn}
              sortedData={sortedData}
              setSortedData={setSortedData}
              status="variation"
            />
          </div>
        </>
      )}

      <VariationsModalComponent
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSort={handleSort}
        filteredColumns={filteredColumns}
      />
    </div>
  );
};

export default Variations;
