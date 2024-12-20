import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./index.css";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalResults: number;
  handlePageChange: (newPage: number) => void;
  handleRowsPerPageChange: (event: any) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalResults,
  handlePageChange,
  handleRowsPerPageChange,
}) => {
  return (
    <div className="pagination-container d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-4">
      <div className="pagination-left">
        <p className="pagination-text p-0 m-0">
          Showing Results of {rowsPerPage} from {totalResults}.
        </p>
      </div>
      <div className="pagination-right d-flex align-items-center gap-1">
        <p className="m-0 p-0 rows-description">Rows per page: </p>
        <FormControl>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            displayEmpty
            inputProps={{ "aria-label": "Rows per page" }}
            style={{ minWidth: 50 }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>

        <div className="pagination-controls d-flex align-items-center">
          <FiChevronLeft
            className={`chevron ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          />
          <span>
            {currentPage} of {totalPages}
          </span>
          <FiChevronRight
            className={`chevron ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
