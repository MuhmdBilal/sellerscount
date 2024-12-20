import { DataGrid } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Spinner } from "react-bootstrap";
import "./index.css";
import { SelectChangeEvent } from "@mui/material/Select";
import { HiDownload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  deleteProductUpload,
  productUpload,
  token,
} from "../../Service/services";
import { RiDeleteBinLine } from "react-icons/ri";
import Loader from "../Loader";
import CustomPagination from "../Pagination";
import ScanCards from "../ScanCards";
import { SearchContext } from "../../context/searchContext";
import toast from "react-hot-toast";
import axios from "axios";
import ConfirmationModal from "./confirmationModal";
const Token = localStorage.getItem("accessToken");
const Scans: React.FunctionComponent = () => {
  const [isusername, setIsUserName] = useState<any>(null);
  const [isData, setData] = useState<any>([]);
  const [isresponse, setIsResponse] = useState<any>([]);
  const [isRow, setIsRow] = useState<any>([]);
  const [isColumns, setIsColumns] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [isTableLoading, setIsTableLoading] = useState<any>(false);
  const [isPerPage, setIsPerPage] = useState<any>(10);
  const [isCurrentPage, setIsCurrentPage] = useState<any>(1);
  const [isCount, setIsCount] = useState<any>([]);
  const [isExportLoading, setIsExportLoading] = useState(false);
  const [loadingRowsDelete, setLoadingRowsDelete] = useState<any>(false);
  const [productId, setProductId] = useState<any>("");
  const [modalShow, setModalShow] = React.useState(false);
  const navigate = useNavigate();
  const searchResult = localStorage.getItem("ASINID");
  const { setSearchValue, setIsGobalFilter } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();
  useEffect(() => {
    const userId = localStorage.getItem("userProfile");
    const userName = userId ? JSON.parse(userId) : null;
    setIsUserName(userName?.userName);
    token();
  }, []);
  useEffect(() => {
    getProductUpload();
    setIsTableLoading(true);
  }, [isCurrentPage, isPerPage]);
  const capitalizeFirstLetter = (string: any) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const getProductUpload = async () => {
    let request = {
      page: isCurrentPage,
      perPage: isPerPage,
    };

    try {
      const response = await productUpload(request);
      if (response.status === 200) {
        setIsResponse(response?.data);
        setData(response?.data?.data);
      }
    } catch (error: any) {
      if (error?.response?.data?.ErrorMessage === "Invalid token") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userProfile");
        navigate("/");
      }
    } finally {
      setIsLoading(false);
      setIsTableLoading(false);
    }
  };
  const toBase64 = (str: string) => {
    return btoa(unescape(encodeURIComponent(str)));
  };
  const handleExportFile = async (filename: any) => {
    try {
      setIsExportLoading(true);
      const response = await axios.post(
        `https://testapi.sellerscout.com/ProductUpload/${filename.productUploadId}/ExportProducts`,
        {
          page: 0,
          perPage: 20000000,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
            ExportFileName: toBase64(filename.fileName),
            CompressZip: "false",
            IsFavoriteFile: "false",
          },
          responseType: "blob",
        }
      );
      // Handle the file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${filename.fileName}-data.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("Export successfully");
      console.log("Export successful");
    } catch (e) {
      console.log("e", e);
    } finally {
      setIsExportLoading(false);
    }
  };
  useEffect(() => {
    setSearchValue("");
    setIsGobalFilter("");
  }, []);
  useEffect(() => {
    if (!isData || isData?.length === 0) {
      setIsColumns([]);
      setIsRow([]);
    } else {
      const columns = Object.keys(isData[0]).map((column) => {
        const baseColumn = {
          field: column,
          headerName: capitalizeFirstLetter(column),
          width: 120,
        };
        if (column === "fileName") {
          return {
            ...baseColumn,
            headerName: "File Name",
            renderCell: (params: any) => (
              <div
                className="table-text tables-heads"
                onClick={() => handleTitleClick(params)}
                style={{ fontWeight: "bold", cursor: "pointer" }}
              >
                {params.row.fileName}
              </div>
            ),
            flex: 1,
          };
        } else if (column === "date") {
          return {
            ...baseColumn,
            headerName: "Date",
            renderCell: (params: any) => (
              <div
                className="centered-cell"
                onClick={() => handleTitleClick(params)}
                style={{ cursor: "pointer" }}
              >
                {new Date(params.value).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </div>
            ),
            flex: 1,
          };
        } else if (column === "numberOfRecords") {
          return {
            ...baseColumn,
            headerName: "Line Count",
            renderCell: (params: any) => (
              <div
                className="centered-cell"
                onClick={() => handleTitleClick(params)}
                style={{ cursor: "pointer" }}
              >
                <div className="table-text">{params.row.numberOfRecords}</div>
              </div>
            ),
            flex: 1,
          };
        } else if (column === "processedPercentage") {
          return {
            ...baseColumn,
            headerName: "Progress",
            renderCell: (params: any) => {
              const processedPercentage = params.value;
              return (
                <div
                  className="centered-cell"
                  onClick={() => handleTitleClick(params)}
                  style={{ cursor: "pointer" }}
                >
                  {processedPercentage === 0 ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    processedPercentage === 100 && "Completed"
                  )}
                </div>
              );
            },
            flex: 1,
          };
        } else if (column === "countryCode") {
          return {
            ...baseColumn,
            headerName: "Market Place",
            renderCell: (params: any) => (
              <div
                className="centered-cell"
                onClick={() => handleTitleClick(params)}
                style={{ cursor: "pointer" }}
              >
                {params.row.countryCode}
              </div>
            ),
            flex: 1,
          };
        } else if (column === "idtype") {
          return {
            ...baseColumn,
            headerName: "ID Type",
            renderCell: (params: any) => (
              <div
                className="centered-cell"
                onClick={() => handleTitleClick(params)}
                style={{ cursor: "pointer" }}
              >
                {params.row.idtype}
              </div>
            ),
            flex: 1,
          };
        } else {
          return baseColumn;
        }
      });
      columns.push({
        field: "condition",
        headerName: "Condition",
        renderCell: (params: any) => (
          <div
            className="centered-cell"
            onClick={() => handleTitleClick(params)}
            style={{ cursor: "pointer" }}
          >
            {params.row.condition || "New"}
          </div>
        ),
        width: 100,
        flex: 1,
      });
      columns.push({
        field: "idtype",
        headerName: "ID Type",
        renderCell: (params: any) => (
          <div
            className="centered-cell"
            onClick={() => handleTitleClick(params)}
            style={{ cursor: "pointer" }}
          >
            {params.row.idtype || "UPC"}
          </div>
        ),

        width: 100,
        flex: 1,
      });

      columns.push({
        field: "buttons",
        headerName: "",

        renderCell: (params: any) => (
          <div className="d-flex gap-2 centered-cell padding-icon">
            <button
              className="btn-refresh-scans"
              onClick={() => handleDeleteProductConfirmation(params.row)}
              disabled={!!loadingRowsDelete}
            >
              <RiDeleteBinLine />
            </button>
            <button
              className="btn-download-scans"
              onClick={() => handleExportFile(params.row)}
            >
              <HiDownload />
            </button>
          </div>
        ),
        width: 100,
        flex: 1,
      });

      const rows = isData?.map((item: any, index: any) => ({
        id: index,
        ...item,
      }));

      const updateColumn = columns.filter(
        (column) => column.field !== "productUploadId"
      );
      setIsColumns(updateColumn);
      setIsRow(rows);
    }
  }, [isData]);
  const handleDeleteProductConfirmation = (productId: any) => {
    setModalShow(true);
    setProductId(productId.productUploadId);
  };
  const modalClose = () => {
    setModalShow(false);
    setProductId("");
    setLoadingRowsDelete(false);
  };
  const handleDeleteProduct = async () => {
    try {
      setLoadingRowsDelete(true);
      const object = {
        productUploadId: productId,
      };
      const response = await deleteProductUpload(object);
      if (response) {
        toast.success("Product deleted successfully!");
        getProductUpload();
      }
    } catch (e) {
      console.log("e", e);
    } finally {
      setLoadingRowsDelete(false);
      setModalShow(false);
    }
  };
  const handlePageChange = (newPage: number) => {
    setIsCurrentPage(newPage);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setIsPerPage(event.target.value);
  };
  const handleTitleClick = (params: any) => {
    navigate(
      `/product-details/${params.row.productUploadId}/${params.row.countryCode}/${params.row.date}/${params.row.fileName}`
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getProductUpload();
      const inProgressRows = isRow?.filter(
        (row: any) => row.processedPercentage === 0
      );
      if (inProgressRows.length === 0) {
        clearInterval(interval);
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [isRow]);

  useEffect(() => {
    const getTotalRecordsCount = () => {
      try {
        if (isresponse) {
          const totalCount = isresponse.data.reduce(
            (acc: number, item: any) => acc + item.numberOfRecords,
            0
          );
          setIsCount(totalCount);
        }
      } catch (error) {
        console.error("Error calculating total count:", error);
      }
    };

    getTotalRecordsCount();
  }, [isresponse]);

  return (
    <section className="px-4 ranks-offers">
      {isExportLoading ? (
        <div className="ranks-loader-particular">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <></>
      )}
      <div className="d-flex flex-md-row flex-column justify-content-between pb-3">
        <div className="d-flex gap-3 align-items-center">
          <img src="/images/flag-us.svg" alt="flag" width={20} />
          <p className="m-0 amazon-title">
            Latest Amazon Product Sales Rank Tables
          </p>
        </div>
        <div className="d-flex gap-2">
          <img src="/images/flag-two.svg" alt="" width={20} />
          <img src="/images/flag-three.svg" alt="" width={20} />
          <img src="/images/flag-four.svg" alt="" width={20} />
          <img src="/images/flag-five.svg" alt="" width={20} />
          <img src="/images/flag-six.svg" alt="" width={20} />
          <img src="/images/flag-seven.svg" alt="" width={20} />
          <img src="/images/flag-eight.svg" alt="" width={20} />
        </div>
      </div>

      {isLoading ? (
        <div className="loading-loader">
          <Loader />
        </div>
      ) : (
        <Container fluid className="px-2">
          <div className="mt-2 px-2">
            <ScanCards
              totalCount={isresponse.total}
              getProductUpload={getProductUpload}
            />
          </div>
          <div className="w-100 scans-table-page">
            <Col md={12} sm={12} className="p-0">
              {isTableLoading ? (
                <div
                  className="loading-loader table-loading new-scans-table"
                  style={{
                    minHeight: "400px",
                    maxHeight: "400px",
                    height: "400px",
                  }}
                >
                  <Loader />
                </div>
              ) : (
                <>
                  <div className="new-scans-table">
                    <DataGrid
                      // className="custom-grid-table"
                      rows={isRow}
                      columns={isColumns}
                      hideFooter={true}
                      getRowId={(row: any) => row.id}
                      checkboxSelection={false}
                    />
                  </div>
                  <div className="pagination-dialog">
                    <CustomPagination
                      currentPage={isCurrentPage}
                      totalPages={isresponse.lastPage}
                      rowsPerPage={isPerPage}
                      totalResults={isresponse.total}
                      handlePageChange={handlePageChange}
                      handleRowsPerPageChange={handleChange}
                    />
                  </div>
                </>
              )}
            </Col>
          </div>
        </Container>
      )}
      <ConfirmationModal
        modalShow={modalShow}
        modalClose={modalClose}
        onConfirm={handleDeleteProduct}
        loadingRowsDelete={loadingRowsDelete}
      />
    </section>
  );
};

export default Scans;
