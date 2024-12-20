import React, { useContext, useEffect, useState } from "react";
import CustomPagination from "../Pagination";
import "./index.css";
import { SearchContext } from "../../context/searchContext";
import { productHistory } from "../../Service/services";
import Loader from "../Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { countryCodes } from "../../constants";

const History: React.FC = ({ searchResult }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalRecord, setTotalRecord] = useState<any>();
  const [totalProductHistory, setTotalProductHistory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalRecord / rowsPerPage);
  const { setSearchValue, setIsGobalFilter } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();
  useEffect(() => {
    setSearchValue("");
    setIsGobalFilter("");
  }, []);
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1);
  };
  const getProductHistory = async () => {
    try {
      setIsLoading(true);
      const object = {
        request: {
          page: currentPage,
          perPage: rowsPerPage,
        },
      };
      const response = await productHistory(object);
      setTotalRecord(response.data?.total);
      setTotalProductHistory(response.data?.data);
    } catch (e) {
      console.log("e", e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProductHistory();
  }, [currentPage, rowsPerPage]);
  const getFlagIcon = (countryCode: string) => {
    const country = countryCodes.find(
      (country) => country.CountryCode === countryCode
    );
    return country ? country.CountryIcon : "";
  };
  return (
    <section className="px-4">
      {isLoading ? (
        <div className="loading-loader" style={{ height: "40vh" }}>
          <Loader />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <h1 className="title-heading mb-2">History</h1>
          </div>

          {totalProductHistory.map((item: any, index: any) => (
            <div
              key={index}
              className={`history-box d-flex flex-column flex-md-row gap-0 gap-md-4 align-items-start cursor-pointer ${
                index % 2 === 1 ? "even-background" : ""
              }`}
              onClick={() => navigate(`/overview?asin=${item.asin}`)}
            >
              <img
                src={item?.imageUrl}
                alt={item.title}
                className="first-img"
              />
              <div className="history-content pt-2">
                <p className="m-0 p-0 history-details">{item.title}</p>
                <p className="history-timestamp pt-1">
                  {moment(item.createdDate).format("DD MMM YYYY, HH:mm")}
                </p>
                <div className="history-credentials d-flex flex-column flex-md-row gap-1 gap-md-2 align-items-start align-items-md-center">
                  <img
                    src={getFlagIcon(item.countryCode)}
                    alt="flag"
                    width="30px"
                  />{" "}
                  <p className="p-0 m-0">ASIN: {item.asin}</p>
                </div>
              </div>
            </div>
          ))}
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            totalResults={totalRecord}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}
    </section>
  );
};

export default History;
