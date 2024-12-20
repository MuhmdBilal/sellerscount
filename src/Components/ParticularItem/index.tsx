import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { IoIosStar } from "react-icons/io";
import { HiDownload } from "react-icons/hi";
import Box from "@mui/material/Box";
import { message } from "antd";
import toast from "react-hot-toast";
import "./index.css";
import {
  addFavListProduct,
  getFavListSource,
  getGraphDetails,
  postFavListSource,
  productDetails,
  token,
  FavListIsExists,
} from "../../Service/services";
import { BarChart as ChartIcon } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { FaAmazon } from "react-icons/fa";
import { MdOutlineBarChart } from "react-icons/md";
import { FaRegImage } from "react-icons/fa6";
import { Button, Input, Modal, Popconfirm } from "antd";
import Loader from "../Loader";
import { IoMdAdd } from "react-icons/io";
import CopyText from "../CopyText";
import { SearchContext } from "../../context/searchContext";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import OverviewModal from "./overviewModal";

const Token = localStorage.getItem("accessToken");

const ParticularItem: React.FunctionComponent = () => {
  const [islist, setIsList] = useState<any>([]);
  const [isExport, setIsExport] = useState<any>();
  const [isresponse, setIsResponse] = useState<any>([]);
  const [isInput, setIsInput] = useState<any>();
  const [isData, setIsDataId] = useState<any>([]);
  const [response, setresponse] = useState<any>([]);
  const [isRow, setIsRow] = useState<any>([]);
  const [isgraph, setIsGraph] = useState<any>(null);
  const [isCurrentPage, setIsCurrentPage] = useState<any>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isColumns, setIsColumns] = useState<any>([]);
  const [isFavList, setIsFavList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOkButtonDisabled, setIsOkButtonDisabled] = useState<boolean>(true);
  const [isgraphLoading, setIsGraphLoading] = useState<boolean>(true);
  const [isCompressChecked, setIsCompressChecked] = useState<boolean>(false);
  const [isExportLoading, setIsExportLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const { setSearchValue, setIsGobalFilter, searchValue } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();

  const handleTitleClick = (params: any) => {
    setSearchValue(params.row.asin);
    setShow(true);
  };

  useEffect(() => {
    token();
  }, []);
  useEffect(() => {
    getAll();
  }, [isCurrentPage]);

  const getAll = async () => {
    setIsLoading(true);
    let IsFavoriteFile;
    if (params.code === "Favorite") {
      IsFavoriteFile = true;
    } else {
      IsFavoriteFile = false;
    }
    let request = { page: isCurrentPage, perPage: 50 };
    try {
      const response = await productDetails(params.id, request, IsFavoriteFile);
      setIsResponse(response.data.data);
      setresponse(response.data);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleChartIconHover = (value: any) => {
    setIsGraph(null);
    setIsGraphLoading(true);
    const request = {
      country: value.row.countryCode,
      asin: value.row.asin,
      range: 30,
    };
    getGraph(request);
  };
  const getGraph = async (request: any) => {
    try {
      setIsGraph(null);
      setIsGraphLoading(true);
      const response = await getGraphDetails(request);
      const imageBuffer = await response.data;
      const base64Image = btoa(
        new Uint8Array(imageBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const imageUrl = `data:image/png;base64,${base64Image}`;
      setIsGraph(imageUrl);
    } catch (err) {
      console.error("Error fetching graph", err);
    } finally {
      setIsGraphLoading(false);
    }
  };

  const handlePageChange = (event: any, value: any) => {
    setIsCurrentPage(value);
  };
  const getRowClassName = (params: any) => {
    return params.row.id % 2 === 0 ? "even-row" : "odd-row";
  };
  useEffect(() => {
    if (!isresponse || isresponse.length === 0) {
      setIsColumns([]);
      setIsRow([]);
    } else {
      const columns = [
        {
          field: "imageURL",
          headerName: "",
          width: 140,
          align: "center",
          renderCell: (params: any) => (
            <>
              {params.row.haveInFavorite ? (
                <IconButton
                  style={{
                    fontSize: "small",
                    cursor:
                      params.row.asin === "Not found on Amazon"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <IoIosStar className="star-colour" />
                </IconButton>
              ) : (
                <IconButton
                  style={{
                    fontSize: "small",
                    cursor:
                      params.row.asin === "Not found on Amazon"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <IoIosStar />
                </IconButton>
              )}
              {params.row.asin === "Not found on Amazon" ? (
                <IconButton
                  style={{
                    fontSize: "small",
                    cursor:
                      params.row.asin === "Not found on Amazon"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <FaRegImage />
                </IconButton>
              ) : (
                <Tooltip
                  title={
                    <img
                      src={params.row.imageURL}
                      alt="ProductImage"
                      className="enlarged-image"
                    />
                  }
                >
                  <IconButton style={{ fontSize: "small" }}>
                    <FaRegImage />
                  </IconButton>
                </Tooltip>
              )}

              <IconButton
                style={{
                  fontSize: "small",
                  cursor:
                    params.row.asin === "Not found on Amazon"
                      ? "not-allowed"
                      : "pointer",
                }}
                onClick={() =>
                  window.open(
                    `https://www.amazon.com/dp/${params.row.asin}/ref=olp-opf-redir?aod=1&ie=UTF8&condition=new`,
                    "_blank"
                  )
                }
              >
                <FaAmazon className="amazon-image" />
              </IconButton>
              {params.row.asin === "Not found on Amazon" ? (
                <IconButton
                  style={{
                    fontSize: "small",
                    cursor:
                      params.row.asin === "Not found on Amazon"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  <MdOutlineBarChart data-tooltip-id="my-tooltip-2" />
                </IconButton>
              ) : (
                <Tooltip
                  placement="right"
                  title={
                    isgraphLoading ? (
                      <Spinner animation="border" variant="light" />
                    ) : isgraph ? (
                      <img src={isgraph} alt="graph" className="graph-image" />
                    ) : null
                  }
                  classes={{ tooltip: "custom-tooltip" }}
                >
                  <IconButton
                    style={{
                      fontSize: "small",
                      cursor:
                        params.row.asin === "Not found on Amazon"
                          ? "not-allowed"
                          : "pointer",
                    }}
                    onMouseEnter={() => handleChartIconHover(params)}
                  >
                    <MdOutlineBarChart data-tooltip-id="my-tooltip-2" />
                  </IconButton>
                </Tooltip>
              )}
            </>
          ),
        },
        {
          field: "productSearch",
          headerName: "Search Identifier",
          width: 155,
          align: "left",
          renderCell: (params: any) => (
            <div>
              <CopyText value={params.row.productSearch} show={true} />
            </div>
          ),
        },
        {
          field: "asin",
          headerName: "ASIN",
          width: 155,
          align: "left",
          renderCell: (params: any) => (
            <div>
              <CopyText value={params.row.asin} show={true} />
            </div>
          ),
        },
        {
          field: "upc",
          headerName: "UPC",
          width: 150,
          renderCell: (params: any) => (
            <div className="centered-cell">
              {params.value && (
                <>
                  <CopyText value={params.value} show={true} />
                </>
              )}
            </div>
          ),
        },

        {
          field: "ean",
          headerName: "EAN",
          width: 190,
          renderCell: (params: any) => (
            <div className="centered-cell">
              {params.value && (
                <>
                  <CopyText value={params.value} show={true} />
                </>
              )}
            </div>
          ),
        },
        {
          field: "isbn",
          headerName: "ISBN",
          width: 130,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "title",
          headerName: "Title",
          width: 450,
          renderCell: (params: any) => (
            <Tooltip title={params.row.title} arrow>
              <div
                className="hyperlink-style"
                onClick={() => handleTitleClick(params)}
                style={{ cursor: "pointer" }}
              >
                {params.row.title.length > 57
                  ? `${params.row.title.substring(0, 57)}...`
                  : params.row.title}
              </div>
            </Tooltip>
          ),
        },
        {
          field: "estimatedSales",
          headerName: "Est Sales",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">
              {params.value !== null && params.value <= 5 ? (
                <>
                  <span className="price-drop-icon">{"<"}</span>
                  {params.value}
                </>
              ) : (
                params.value
              )}
            </div>
          ),
        },
        {
          field: "profit",
          headerName: "Profit",
          width: 90,
          wordWrap: "break-word",
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value}</div>
          ),
        },
        {
          field: "roi",
          headerName: "ROI",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}%</div>
          ),
        },
        {
          field: "margin",
          headerName: "Margin",
          width: 120,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}%</div>
          ),
        },
        {
          field: "salesRank",
          headerName: "Sales Rank",
          width: 120,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "productGroup",
          headerName: "Product Group",
          width: 150,
          renderCell: (params: any) => (
            <Tooltip title={params.row.title} arrow>
              <div style={{ cursor: "pointer" }}>
                {params.row.productGroup.length > 15
                  ? `${params.row.productGroup.substring(0, 15)}...`
                  : params.row.productGroup}
              </div>
            </Tooltip>
          ),
        },
        {
          field: "cost",
          headerName: "Cost",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value}</div>
          ),
        },
        {
          field: "costSubTotal",
          headerName: "Cost Sub Total",
          width: 120,
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value}</div>
          ),
        },
        {
          field: "inboundShippingEstimate",
          headerName: "Inbound Shipping Estimate",
          width: 220,
          wordWrap: "break-word",
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value}</div>
          ),
        },
        {
          field: "marginImpact",
          headerName: "Margin Impact",
          width: 120,
          renderCell: (params: any) => (
            <div className="centered-cell  param-value d-flex justify-content-center ">
              ${params.value}
            </div>
          ),
        },
        {
          field: "price",
          headerName: "Price",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value}</div>
          ),
        },
        {
          field: "model",
          headerName: "Model",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "partNumber",
          headerName: "Part Number",
          width: 120,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "manufacturer",
          headerName: "Manufacturer",
          width: 120,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "vat",
          headerName: "Vat",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "vatPercentage",
          headerName: "Vat Percentage",
          width: 140,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "vatAmount",
          headerName: "Vat Amount",
          width: 120,
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value}</div>
          ),
        },
        {
          field: "packageQuantity",
          headerName: "Package Quantity",
          width: 150,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "packageHeight",
          headerName: "Package Height",
          width: 150,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "packageLength",
          headerName: "Package Length",
          width: 140,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "packageWidth",
          headerName: "Package Width",
          width: 140,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "packageWeight",
          headerName: "Package Weight",
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
          width: 150,
        },
        {
          field: "packageDim",
          headerName: "Package Dimension",
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
          width: 170,
        },
        {
          field: "buyBoxLanded",
          headerName: "BuyBox Price",
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
          width: 130,
        },
        {
          field: "buyBoxContention",
          headerName: "BuyBox Contention",
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
          width: 150,
        },
        {
          field: "averageBuyBoxPrice30",
          headerName: "Avg BuyBoxPrice 30d",
          width: 180,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "averageBuyBoxPrice90",
          headerName: "Avg BuyBoxPrice 90d",
          width: 180,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "averageBuyBoxPrice180",
          headerName: "Avg BuyBoxPrice 180d",
          width: 190,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "rating",
          headerName: "Rating",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "reviews",
          headerName: "Reviews",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "variationParent",
          headerName: "Variation Parent",
          width: 150,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "parentASIN",
          headerName: "Parent ASIN",
          width: 120,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "variationCount",
          headerName: "Variation Count",
          width: 150,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "offers",
          headerName: "Offers",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "shippingCost",
          headerName: "Shipping Cost",
          width: 130,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "color",
          headerName: "Color",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "size",
          headerName: "Size",
          width: 90,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "fbaFee",
          headerName: "FBA Fee",
          width: 120,
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value}</div>
          ),
        },
        {
          field: "referralFee",
          headerName: "Referral Fee",
          width: 120,
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value}</div>
          ),
        },
        {
          field: "variableClosingFee",
          headerName: "Variable Closing Fee",
          width: 170,
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value || "0.0"}</div>
          ),
        },
        {
          field: "amazonLastSeen",
          headerName: "Amazon Last Seen",
          width: 200,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "fixedAdditionalCost",
          headerName: "Fixed Additional Cost",
          width: 170,
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value || "0.0"}</div>
          ),
        },
        {
          field: "additionalCost",
          headerName: "Additional Cost",
          width: 150,
          renderCell: (params: any) => (
            <div className="centered-cell">${params.value || "0.0"}</div>
          ),
        },
        {
          field: "salesRankDrops30",
          headerName: "SalesRank Drops 30",
          width: 180,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "salesRankDrops90",
          headerName: "SalesRank Drops 90",
          width: 180,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "salesRankDrops180",
          headerName: "SalesRank Drops 180",
          width: 180,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "averageBSR30",
          headerName: "Average BSR 30",
          width: 150,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "averageBSR90",
          headerName: "Average BSR 90",
          width: 150,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "averageBSR180",
          headerName: "Average BSR 180",
          width: 170,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "amazonInStockRate30",
          headerName: "Amazon In Stock Rate 30",
          width: 200,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "amazonInStockRate90",
          headerName: "Amazon In Stock Rate 90",
          width: 200,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "amazonInStockRate180",
          headerName: "Amazon In Stock Rate 180",
          width: 200,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "lowestBSR30",
          headerName: "Lowest BSR 30",
          width: 130,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "lowestBSR90",
          headerName: "Lowest BSR 90",
          width: 130,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "lowestBSR180",
          headerName: "Lowest BSR 180",
          width: 130,
          renderCell: (params: any) => (
            <div className="centered-cell">{params.value}</div>
          ),
        },
        {
          field: "isHazmat",
          headerName: "Is Hazmat",
          width: 110,
          renderCell: (params: any) => (
            <div className="centered-cell">
              <input
                type="checkbox"
                className="checkbox-desc"
                style={{ width: "19px", height: "19px" }}
                checked={!!params.value}
                readOnly
              />
            </div>
          ),
        },
        {
          field: "isAlcoholic",
          headerName: "Is Alcoholic",
          width: 130,
          renderCell: (params: any) => (
            <div className="centered-cell">
              <input
                type="checkbox"
                className="checkbox-desc"
                style={{ width: "19px", height: "19px" }}
                checked={!!params.value}
                readOnly
              />
            </div>
          ),
        },
        {
          field: "isAdultProduct",
          headerName: "Is Adult Product",
          width: 130,
          renderCell: (params: any) => (
            <div className="centered-cell">
              <input
                type="checkbox"
                className="checkbox-desc"
                style={{ width: "19px", height: "19px" }}
                checked={!!params.value}
                readOnly
              />
            </div>
          ),
        },
      ];
      const rows = isresponse.map((item: any, index: any) => ({
        id: index,
        ...item,
      }));
      const updateColumn = columns;
      setIsColumns(updateColumn);
      setIsRow(rows);
    }
  }, [isresponse, isgraphLoading, isgraph]);

  const showModal = () => {
    if (isData.length === 0) {
      toast.error(
        "No products have been selected. Please choose products from the left column of the grid before proceeding"
      );
    } else {
      setIsModalOpen(true);
      getFavList();
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
    addFavList();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getFavList = async () => {
    try {
      const response = await getFavListSource(105);
      setIsFavList(response.data);
      console.log(response);
    } catch (err) {
      console.log();
    }
  };

  const favListShow = isFavList.map((item: any) => {
    return <MenuItem value={item.favoriteId}>{item.favoriteName}</MenuItem>;
  });
  const changeHandler = (e: any) => {
    setIsList({ ...islist, [e.target.name]: e.target.value });
    setIsOkButtonDisabled(false);
  };

  const checkIfFavListExists = async () => {
    const favoriteName = isInput;
    console.log(favoriteName);

    try {
      const response = await FavListIsExists(favoriteName);
      const doesListExist = response.data;

      if (doesListExist) {
        message.error("Name already exists. Please create a new name.");
      } else {
        setIsOkButtonDisabled(true);
        await postFavList();
      }

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitList = async () => {
    checkIfFavListExists();
  };
  const postFavList = async () => {
    if (isInput) {
      try {
        const response = await postFavListSource(isInput);
        if (response.status === 200) {
          getFavList();
        }
      } catch (err) {}
    }
    console.log(isInput);
  };
  const addFavList = async () => {
    const request = {
      productUploadId: params.id,
      productIds: isData,
      favoriteId: islist.favorite,
      sourceId: 105,
    };

    try {
      const response = await addFavListProduct(request);
      if (response.data && response.data.success) {
        const successMessage = response.data.description || "successful";
        message.success(successMessage);
      } else {
        const errorMessage = response.data?.description || "failed";
        message.error(errorMessage);
      }
    } catch (err) {
      console.error(err);
      message.error("API call failed");
    }
  };

  const onRowsSelectionHandler = (ids: GridRowId[]) => {
    const selectedRowsData = ids.map((id: any) => {
      const selectedRow = isRow.find((row: any) => row.id === id);
      return selectedRow ? selectedRow.productId : null;
    });
    setIsDataId(selectedRowsData);
  };
  const handleOkHandler = () => {
    if (isExport) {
      addExport();
    }
  };
  const toBase64 = (str: string) => {
    return btoa(unescape(encodeURIComponent(str)));
  };
  const addExport = async () => {
    try {
      setIsExportLoading(true);
      const response = await axios.post(
        `https://testapi.sellerscout.com/ProductUpload/${params.id}/ExportProducts`,
        {
          page: 0,
          perPage: 10,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
            ExportFileName: toBase64(isExport),
            CompressZip: String(isCompressChecked),
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
      a.download = isCompressChecked
        ? `${isExport}-data.zip`
        : `${isExport}-data.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("Export successfully");
      console.log("Export successful");
    } catch (error) {
      console.error("Export failed", error);
      toast.error("Failed to export data");
    } finally {
      setIsCompressChecked(false);
      setIsExport(null);
      setIsExportLoading(false);
    }
  };
  const formatDateTime = (dateTimeString: any) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const date = new Date(dateTimeString);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return date.toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    setSearchValue("");
    setIsGobalFilter("");
  }, []);
  return (
    <section className="px-4 ranks-offers">
      {isLoading ? (
        <div className="loading-loader">
          <Loader />
        </div>
      ) : (
        <Container fluid>
          {isExportLoading ? (
            <div className="ranks-loader-particular">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <></>
          )}
          <Row>
            <Col>
              <div className="product-item-table">
                <div className="d-flex align-items-center justify-content-between mb-3 mt-2">
                  <div className="d-flex gap-2">
                    <h1 className="title-heading">{params.file}</h1>
                    <h1 className="title-heading">
                      {formatDateTime(params.time)}
                    </h1>
                  </div>
                  <div className="d-flex gap-2 align-items-center">
                    <Popconfirm
                      title="Enter Name"
                      description={
                        <div>
                          <Input
                            onChange={(e) => setIsExport(e.target.value)}
                          />
                          <div className="pt-2 d-flex align-items-center gap-2">
                            <input
                              type="checkbox"
                              className="checkbox-desc"
                              style={{ width: "19px", height: "19px" }}
                              onChange={(e) =>
                                setIsCompressChecked(e.target.checked)
                              }
                              checked={isCompressChecked}
                            />
                            Compress
                          </div>
                        </div>
                      }
                      onConfirm={handleOkHandler}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="primary" className="boxering-btn">
                        <div className="d-flex align-items-center">
                          <HiDownload className="me-2" />
                          Export
                        </div>
                      </Button>
                    </Popconfirm>
                    <Button
                      type="primary"
                      onClick={showModal}
                      className="boxering-btn"
                    >
                      <div className="d-flex align-items-center">
                        <IoMdAdd className="me-2" />
                        Add to favorite
                      </div>
                    </Button>
                    <Modal
                      title="Add Products to Favorite"
                      className="basic-modal"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      okButtonProps={{ disabled: isOkButtonDisabled }}
                    >
                      <div className="d-flex justify-content-center">
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, minWidth: 300 }}
                        >
                          <InputLabel
                            id="demo-simple-select-standard-label"
                            style={{ textAlign: "left" }}
                          >
                            Select Favorites List
                          </InputLabel>
                          <Select
                            name="favorite"
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={islist.favorite}
                            onChange={changeHandler}
                            label="Product ID Columns"
                          >
                            {favListShow}
                          </Select>
                          <br />
                          <br />
                          <div className="d-flex align-items-baseline">
                            <TextField
                              fullWidth
                              id="standard-basic"
                              label="Add New Favorite"
                              variant="standard"
                              name="add"
                              onChange={(e) => setIsInput(e.target.value)}
                              required
                              InputLabelProps={{
                                style: { textAlign: "left" },
                              }}
                            />

                            <div>
                              <Button type="primary" onClick={submitList}>
                                Add
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                      </div>
                    </Modal>
                  </div>
                </div>
                <Box sx={{ height: 520, width: "100%" }}>
                  <DataGrid
                    // className="custom-grid-table"
                    rows={isRow}
                    columns={isColumns}
                    hideFooter={true}
                    checkboxSelection
                    onRowSelectionModelChange={(e: GridRowSelectionModel) =>
                      onRowsSelectionHandler(e as GridRowId[])
                    }
                    getRowClassName={getRowClassName}
                  />
                </Box>
                <Stack spacing={2} className="mt-2 mb-5">
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={response.lastPage}
                    page={isCurrentPage}
                    onChange={handlePageChange}
                  />
                </Stack>
              </div>
            </Col>
          </Row>
          <OverviewModal
            show={show}
            setShow={setShow}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
          />
        </Container>
      )}
    </section>
  );
};

export default ParticularItem;
