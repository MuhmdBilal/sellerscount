import React, { useState, useEffect, useContext } from "react";
import "./index.css";
import { Col, Row } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Loader";
import Pagination from "../Pagination";
import { SearchContext } from "../../context/searchContext";

const DetailsTable: React.FC = () => {
  const [isRow, setIsRow] = useState<any>([]);
  const [isColumns, setIsColumns] = useState<any>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalResults, setTotalResults] = useState<number>(0);
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
  useEffect(() => {
    const fetchData = async () => {
      setIsTableLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockRows = [
        {
          id: 1,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 2,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 3,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 4,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 5,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 6,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 7,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 8,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 9,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 10,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 11,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 12,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 13,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 14,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 15,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 16,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 17,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 18,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 19,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
        {
          id: 20,
          category: "Amazon Explore",
          productCount: "113,583",
          top05BSR: 568,
          top1BSR: "1,136",
          top2BSR: "2,272",
          top3BSR: "3,407",
          top5BSR: "5,679",
          top10BSR: "11,358",
        },
      ];

      const columns = [
        {
          field: "category",
          headerName: "Category",
          flex: 1,
          renderCell: (params: any) => (
            <span className="bold-category">{params.value}</span>
          ),
        },
        { field: "productCount", headerName: "Product Count", flex: 1 },
        { field: "top05BSR", headerName: "Top 0.5% BSR", flex: 1 },
        { field: "top1BSR", headerName: "Top 1% BSR", flex: 1 },
        { field: "top2BSR", headerName: "Top 2% BSR", flex: 1 },
        { field: "top3BSR", headerName: "Top 3% BSR", flex: 1 },
        { field: "top5BSR", headerName: "Top 5% BSR", flex: 1 },
        { field: "top10BSR", headerName: "Top 10% BSR", flex: 1 },
      ];

      setIsRow(mockRows);
      setIsColumns(columns);
      setTotalResults(mockRows.length);
      setIsTableLoading(false);
    };

    fetchData();
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const currentRows = isRow.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <section className="px-4">
      <div className="d-flex flex-md-row flex-column justify-content-between pb-3">
        <div className="d-flex gap-3 align-items-center">
          <img src="/images/flag-us.svg" alt="flag" width={20} />
          <p className="m-0 amazon-title">
            {" "}
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
      <div className="pt-1 pb-4 points">
        <p>Country: US (amazon.com)</p>
        <p>Last updated: 20 Aug 2024</p>
        <p>
          Amazon sales rank illustrates how well a product sells compared to
          other products in the same category. For example, a rank of 1 means
          that is the best-selling product in that category.
        </p>
        <p>
          SellerAmp sales rank tables show the number of products in each
          category, in each Amazon marketplace. They also show the number of
          products in the top best sellers rank (BSR) percentiles.
        </p>
        <p>Tables are updated daily.</p>
      </div>
      <Row>
        <Col lg={12} md={12} sm={12}>
          {isTableLoading ? (
            <div
              className="table-loading"
              style={{ height: 369.2, width: "100%" }}
            >
              <Loader />
            </div>
          ) : (
            <div
              className="table-pagination sales-rank-table"
              style={{ height: "auto", width: "100%" }}
            >
              <DataGrid
                className="custom-grid-table "
                rows={currentRows}
                columns={isColumns}
                hideFooter={true}
                getRowId={(row: any) => row.id}
                checkboxSelection={false}
              />
              <div className="pagination-box">
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalResults / rowsPerPage)}
                  rowsPerPage={rowsPerPage}
                  totalResults={totalResults}
                  handlePageChange={handlePageChange}
                  handleRowsPerPageChange={handleRowsPerPageChange}
                />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default DetailsTable;
