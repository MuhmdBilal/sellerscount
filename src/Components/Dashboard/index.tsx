import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  faArrowsRotate,
  faUpload,
  faCheckToSlot,
  faCreditCard,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Verify from "../EmailVerfiy";
import { productUpload, token } from "../../Service/services";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

interface ResultProps {
  searchResult: string | null;
}

const Dashboard: React.FC<ResultProps> = ({ searchResult }) => {
  const [isUsername, setIsUserName] = useState<string | null>(null);
  const [isData, setData] = useState<any[]>([]);
  const [isResponse, setIsResponse] = useState<any[]>([]);
  const [isRow, setIsRow] = useState<any[]>([]);
  const [isColumns, setIsColumns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [isPerPage, setIsPerPage] = useState<number>(10);
  const [isCurrentPage, setIsCurrentPage] = useState<number>(1);
  const [isCount, setIsCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userProfile");
    const userName = userId ? JSON.parse(userId) : null;
    setIsUserName(userName?.userName ?? null);
    token();
  }, []);

  useEffect(() => {
    getProductUpload();
    setIsTableLoading(true);
  }, [isCurrentPage, isPerPage, searchResult]);

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getProductUpload = async () => {
    let request = buildRequest();
    try {
      const response = await productUpload(request);
      if (response.status === 200) {
        setIsResponse(response?.data);
        setData(response?.data?.data);
        setIsLoading(false);
        setIsTableLoading(false);
      }
    } catch (error: any) {
      if (error?.response?.data?.ErrorMessage === "Invalid token") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userProfile");
        navigate("/");
      }
    }
  };

  const buildRequest = (): any => {
    if (searchResult) {
      return {
        page: isCurrentPage,
        perPage: isPerPage,
        filter: [
          {
            field: "FileName",
            filterType: 10,
            value: searchResult,
            sortType: 0,
          },
        ],
      };
    } else {
      return {
        page: isCurrentPage,
        perPage: isPerPage,
      };
    }
  };

  useEffect(() => {
    if (isData.length === 0) {
      setIsColumns([]);
      setIsRow([]);
    } else {
      const columns = buildColumns();
      const rows = buildRows();
      setIsColumns(columns);
      setIsRow(rows);
    }
  }, [isData]);

  const buildColumns = (): any[] => {
    return Object.keys(isData[0]).map((column) => {
      const baseColumn = {
        field: column,
        headerName: capitalizeFirstLetter(column),
        width: 180,
      };

      switch (column) {
        case "fileName":
          return {
            ...baseColumn,
            headerName: "File Name",
            renderCell: (params: any) => (
              <div
                className="table-text tables-heads"
                onClick={() => handleTitleClick(params)}
                style={{ fontWeight: "bold" }}
              >
                {params.row.fileName}
              </div>
            ),
          };
        case "numberOfRecords":
          return {
            ...baseColumn,
            headerName: "Line Count",
            renderCell: (params: any) => (
              <div className="table-text">{params.row.numberOfRecords}</div>
            ),
          };
        case "processedPercentage":
          return {
            ...baseColumn,
            headerName: "Status",
            renderCell: (params: any) => (
              <div className="centered-cell">
                {params.value !== null && params.value === 0
                  ? "InProgress"
                  : "Completed"}
              </div>
            ),
          };
        case "date":
          return {
            ...baseColumn,
            headerName: "Date",
            renderCell: (params: any) => (
              <div className="centered-cell">
                {new Date(params.value).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </div>
            ),
          };
        case "countryCode":
          return {
            ...baseColumn,
            headerName: "Market Place",
            renderCell: (params: any) => (
              <div className="centered-cell">{params.row.countryCode}</div>
            ),
          };
        default:
          return baseColumn;
      }
    });
  };

  const buildRows = (): any[] => {
    return isData.map((item, index) => ({
      id: index,
      ...item,
    }));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setIsCurrentPage(value);
  };

  const handleTitleClick = (params: any) => {
    navigate(
      `/product-details/${params.row.productUploadId}/${params.row.countryCode}/${params.row.date}/${params.row.fileName}`
    );
  };

  useEffect(() => {
    const getTotalRecordsCount = () => {
      try {
        const totalCount = isResponse.data.reduce(
          (acc: number, item: any) => acc + item.numberOfRecords,
          0
        );
        setIsCount(totalCount);
      } catch (error) {
        console.error("Error calculating total count:", error);
      }
    };

    getTotalRecordsCount();
  }, [isResponse]);

  return (
    <>
      <Verify />
      {isLoading ? (
        <div className="main-loading">
          <Loader />
        </div>
      ) : (
        <Container fluid>
          <Row className="mt-4">
            <p className="admin">Welcome Back, {isUsername}!</p>
            <Col md={3} sm={12}>
              <div className="items-grid">
                <div>
                  <span className="admins">{isCount}</span>
                  <br />
                  Items Scanned
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faArrowsRotate}
                    className="items-icons mx-2"
                  />
                </div>
              </div>
            </Col>
            <Col md={3} sm={12}>
              <div className="items-grid">
                <div>
                  <span className="admins">{isResponse.total}</span>
                  <br />
                  Files Uploaded
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faUpload}
                    className="items-icons mx-2"
                  />
                </div>
              </div>
            </Col>
            <Col md={3} sm={12}>
              <div className="items-grid">
                <div>
                  <span className="admins">New</span>
                  <br />
                  Scan Available
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faCheckToSlot}
                    className="items-icons mx-2"
                  />
                </div>
              </div>
            </Col>
            <Col md={3} sm={12}>
              <div className="items-grid">
                <div>
                  <span className="admins">FREE</span>
                  <br />
                  Membership
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="items-icons mx-2"
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={3} sm={12}>
              <div className="items-Exchange">
                <div>Exchange Rates</div>
                <div>
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="filter-box mx-2"
                  />
                </div>
              </div>
              <div className="Exchange-Rates"></div>
            </Col>
            <Col md={9} sm={12}>
              <div className="Recent-Scans">
                <div>Recent Scans</div>
              </div>
              {isTableLoading ? (
                <div
                  className="table-loading"
                  style={{ height: 369.2, width: "100%" }}
                >
                  <Loader />
                </div>
              ) : (
                <div style={{ height: 369.2, width: "100%" }}>
                  <DataGrid
                    className="grid-table"
                    rows={isRow}
                    columns={isColumns}
                    hideFooter={true}
                    getRowId={(row: any) => row.id}
                    checkboxSelection={false}
                  />
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <Stack spacing={2} className="mt-2 mb-5">
                        <Pagination
                          variant="outlined"
                          shape="rounded"
                          count={isResponse.lastPage}
                          page={isCurrentPage}
                          onChange={handlePageChange}
                        />
                      </Stack>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Dashboard;
