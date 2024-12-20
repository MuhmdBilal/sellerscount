import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./index.css";
import Loader from "../Loader";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import {
  ProductUploadProcess,
  addProductUpload,
  productUpload,
  token,
  uploadFile,
} from "../../Service/services";
import { Col, Row } from "react-bootstrap";
import { Checkbox, ListItemText } from "@mui/material";
interface YourComponentProps {
  getProductUpload: any
}
const UploadFile: React.FC<YourComponentProps> = ({getProductUpload}) => {
  const [selectedRadio, setSelectedRadio] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [islist, setIsList] = useState<any>({
    custom: [],
    product: [],
    cost:[]
  });
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isError, setIsError] = useState<any>(null);
  const [productData, setProductData] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isresponse, setIsResponse] = useState<any>({});
  const [iscustomerror, setIsCustomError] = useState<any>(null);
  const [isColumn, setIsColumns] = useState<any>([]);
  const [isRow, setIsRow] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [validationErrors, setValidationErrors] = useState<any>({});

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    token();
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsList({ custom: [] });
    setIsModalOpen(false);
    setSelectedFile(null);
    setIsCustomError(null);
  };

  const handleTemplate = () => {
    setIsModalOpen(false);
  };

  const validateFields = () => {
    const errors: any = {};

    if (!productData.productIdColumnSelectedItem) {
      errors.productIdColumnSelectedItem = "Product ID Column is required.";
    }
    if (!productData.costColumnSelectedItem) {
      errors.costColumnSelectedItem = "Cost Column is required.";
    }
    if (!productData?.productIdTypeSelectedItem) {
      errors.productIdTypeSelectedItem = "Search By is required.";
    }
    if (!productData.productIdTypeSelectedItem) {
      errors.productIdTypeSelectedItem = "Search type is required.";
    }
    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };


  const startHandler = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await uploadFile(formData);
        if (response.status === 200) {
          setIsLoading(false);
          setIsResponse(response.data);
          setValue(response.data.fileNameOnly)
          setProductData(response.data);
          setIsList((prevIsList: any) => ({
            ...prevIsList,
            product : [response?.data?.productIdColumnSelectedItem],
            cost: [response?.data?.costColumnSelectedItem]
          }))
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Please select a file first");
    }
  };
  const addproducts = async () => {

    if (!validateFields()) {
      message.error("Please fill all required fields.");
      return;
    }
    setIsLoading(true);
    const request = {
      fileSearchType: isresponse.fileSearchType,
      fileName: value+isresponse.fileSearchType,
      filePath: isresponse.filePath,
      productIdType: selectedRadio,
      productIdColumn: islist?.product[0],
      productCostColumn: islist?.cost[0],
      uploadProcessingStatus: 0,
      haveExtraColumn: true,
      haveHeader: true,
      processedPercentage: 0,
      numberOfProducts: isresponse.numberOfRecords,
      additionalColumns: "",
      emailNotification: true,
      SourceId: 105,
    };
    try {
      const response = await addProductUpload(request);
      if (response.status === 200) {
        if (!response.data.success) {
          setIsCustomError(response.data.description);
          setIsLoading(false);
        } else {
          const request = {
            page: 1,
            perPage: 10,
          };
          setSelectedFile(null);
          setIsModalOpen(false);
          setIsLoading(false);
          message.success("Processed Succesfully");
          productUpload(request);
          ProductUploadProcess();
          getProductUpload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const customColum = isresponse.productIdColumn?.map((item: any) => (
    <MenuItem key={item} value={item}>
      <Checkbox checked={islist.custom.indexOf(item) > -1} />
      <ListItemText primary={item} />
    </MenuItem>
  ));

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsError(null);
      setIsLoading(true);
    }
  };
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const isValidFileType = (file: any) => {
    return (
      file.type === "text/csv" ||
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
  };
  const handleDrop = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && isValidFileType(file)) {
      if (file) {
        setSelectedFile(file);
        setIsError(null);
        setIsLoading(true);
      }
    } else {
      setIsError("Invalid file type. Please drop a CSV or Excel file.");
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(event.target.value);
  };
  const changeHandler = (e: any) => {
    const { name, value } = e.target;
    setIsList((prevIsList: any) => ({
      ...prevIsList,
      [name]: typeof value === "string" ? value.split(",") : value,
    }));

    if (typeof value === "string" && value.trim() !== "") {
      setValidationErrors((prevErrors: any) => ({
        ...prevErrors,
        [name]: null,
      }));
    }

    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!isresponse.data || isresponse.data.length === 0) {
      setIsColumns([]);
      setIsRow([]);
    } else {
      const columns = Object.keys(isresponse.data[0]).map((column) => {
        const baseColumn = {
          field: column,
          headerName: column,
          minWidth: column === "ImageURL" ? 400 : (column === "Title" ? 1200 : 150),
          flex: 1,
        };
        if (column === "fileName") {
          return {
            ...baseColumn,
            headerName: "File Name",
            renderCell: (params: any) => (
              <div className="table-text">{params.row.fileName}</div>
            ),
          };
        } else return baseColumn;
      });
      const rows = isresponse.data.map((item: any, index: any) => ({
        id: index,
        ...item,
      }));
      setIsColumns(columns);
      setIsRow(rows);
    }
  }, [isresponse.data]);

  useEffect(() => {
    if (productData?.productIdTypeSelectedItem === "UPC/EAN") {
      setSelectedRadio("UPC");
    } else {
      setSelectedRadio(productData?.productIdTypeSelectedItem || "");
    }
  }, [productData]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);
  useEffect(() => {
    if (selectedFile) {
      startHandler();
    }
  }, [selectedFile]);
  return (
    <div className="upload-file-modal">
      <div className="scan-box" onClick={showModal}>
        <span className="ms-2"> Scan New Item</span>
      </div>
      <Modal
        width={1000}
        title="Start Scan"
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        footer={
          !isLoading
            ? [
              selectedFile ? (
                <div className="d-flex btns-main ">
                  <Button key="save" onClick={handleCancel} className="scan-btn-cancel">
                    Cancel
                  </Button>
                  <Button
                    key="template"
                    onClick={addproducts}
                    className="save-btn-start"
                  >
                    Start
                  </Button>
                </div>
              ) : (
                <div className="d-flex btns-main">
                  <Button key="save" onClick={handleCancel} className="save-btn-cancel">
                    Cancel
                  </Button>
                  <Button
                    key="template"
                    onClick={handleTemplate}
                    className="save-btn-template  "
                  >
                    Template
                  </Button>
                </div>
              ),

            ]
            : null
        }
      >
        <form
          className="form-container"
          encType="multipart/form-data"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div>
            {isLoading ? (
              <div className="Loader">
                <Loader />
              </div>
            ) : selectedFile ? (
              <div className="uploadfile-table">
                <span className="text-danger">{iscustomerror}</span>
                <p className="starting">Starting Position</p>
                <div className="uploadfile">
                  <p className="m-0 p-0 upload-banner">{isresponse.fileName}</p>
                </div>
                <div
                  style={{ height: "300px", width: "100%" }}
                  className="upload-table"
                >
                  <DataGrid
                    className="scan-table"
                    rows={isRow}
                    columns={isColumn}
                    hideFooter={true}
                    getRowId={(row) => row.id}
                    checkboxSelection={false}
                    onRowSelectionModelChange={(data: any) => {
                    }}
                  />
                </div>
                <div>
                  <div className="d-flex align-items-center justify-content-between flex-column flex-md-row">
                    <FormControl>
                      <div className="d-flex align-items-center flex-wrap ">
                        <FormLabel
                          id="demo-row-radio-buttons-group-label"
                          className="mx-2"
                        >
                          Search By*
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={selectedRadio}
                          onChange={handleRadioChange}
                        >
                          <FormControlLabel value="UPC" control={<Radio />} label="UPC" />
                          <FormControlLabel value="EAN" control={<Radio />} label="EAN" />
                          <FormControlLabel value="ASIN" control={<Radio />} label="ASIN" />
                          <FormControlLabel value="ISBN" control={<Radio />} label="ISBN" />
                        </RadioGroup>
                      </div>
                      {validationErrors.productIdTypeSelectedItem && (
                        <span className="error">{validationErrors.productIdTypeSelectedItem}</span>
                      )}
                    </FormControl>

                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "40ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        className="mr-0"
                        id="standard-basic"
                        label="File Name"
                        variant="standard"
                        value={value}
                        onChange={handleChange}
                      />
                    </Box>
                  </div>

                  <Row className="mb-4  input-row">
                    <Col lg={4} md={6} sm={6} xs={6} className="pl-0 product-input">
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, width: '100%', maxWidth: "100%" }}
                      >
                        <InputLabel id="demo-simple-select-standard-label" className="label-input">
                          Product ID Column*
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={islist?.product[0]}
                          name="product"
                          onChange={changeHandler}
                          label="Product ID Columns*"
                        >
                          {productData?.productIdColumn &&
                            productData.productIdColumn.map((item: string, index: number) => (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                        </Select>
                        {validationErrors.productIdColumnSelectedItem && (
                          <span className="error">{validationErrors.productIdColumnSelectedItem}</span>
                        )}
                      </FormControl>
                    </Col>
                    <Col lg={4} md={6} sm={6} xs={6}>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, width: '100%', maxWidth: "100%" }}
                      >
                        <InputLabel id="demo-simple-select-standard-label" className="label-input">
                          Marketplace*
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={islist.market}
                          name="market"
                          onChange={changeHandler}
                          label="Product ID Columns*"
                          defaultValue={10}
                        >
                          <MenuItem value={10}>US</MenuItem>
                          <MenuItem value={20}>EU</MenuItem>
                          <MenuItem value={30}>UA</MenuItem>
                        </Select>
                      </FormControl>
                    </Col>
                    <Col lg={4} md={6} sm={6} xs={6}>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, width: '100%', maxWidth: "100%" }}
                      >
                        <InputLabel id="demo-simple-select-standard-label" className="label-input">
                          Cost Column*
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label "
                          id="demo-simple-select-standard"
                          value={islist?.cost[0]}
                          name="cost"
                          onChange={changeHandler}
                          label="Product ID Columns*"
                        >
                          {productData?.costColumn &&
                            productData.costColumn.map((item: string, index: number) => (
                              <MenuItem key={index} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                        </Select>
                        {validationErrors.costColumnSelectedItem && (
                          <span className="error">{validationErrors.costColumnSelectedItem}</span>
                        )}
                      </FormControl>
                    </Col>
                    <Col lg={4} md={6} sm={6} xs={6} className="pl-0 product-input">
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, width: '100%', maxWidth: "100%" }}
                      >
                        <InputLabel id="demo-simple-select-standard-label" className="label-input">
                          Currency*
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label relative"
                          id="demo-simple-select-standard"
                          value={islist.currency}
                          name="currency"
                          onChange={changeHandler}
                          label="Product ID Columns*"
                          defaultValue={10}
                        >
                          <MenuItem value={10}>USD</MenuItem>
                        </Select>
                      </FormControl>

                    </Col>
                    <Col lg={4} md={6} sm={6} xs={6}>
                      <FormControl variant="standard" sx={{ m: 1, width: "100%", maxWidth: "100%" }}>
                        <InputLabel id="demo-multiple-select-label" className="label-input">
                          Custom Columns
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-select-label"
                          id="demo-multiple-select"
                          multiple
                          value={islist.custom}
                          name="custom"
                          onChange={(e) => changeHandler(e)}
                          renderValue={(selected) => (Array.isArray(selected) ? selected.join(", ") : "")}
                          open={open}
                          onOpen={handleOpen}
                          onClose={handleClose}
                          label="Product ID Columns*"
                        >
                          {customColum}
                        </Select>
                      </FormControl>
                    </Col>
                    <Col lg={4} md={6} sm={6} xs={6}>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, width: '100%', maxWidth: "100%" }}
                      >
                        <InputLabel id="demo-simple-select-standard-label" className="label-input">
                          Condition*
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={islist.condition}
                          name="condition"
                          onChange={changeHandler}
                          label="Product ID Columns*"
                          defaultValue={10}
                        >
                          <MenuItem value={10}>NEW</MenuItem>
                          <MenuItem value={20}>USED</MenuItem>
                        </Select>
                      </FormControl>
                    </Col>
                  </Row>
                </div>
              </div>
            ) : (
              <>
                {/* <div className="upload">
                <span className="text-danger">{isError}</span>
                <div>
                  <label className="">
                    <input
                      type="file"
                      className="default-file-input"
                      accept=".csv, .xlsx"
                      onChange={handleFileChange}
                    />
                    <span className="browse-files">
                      Click to select a file
                    </span>
                  </label>
                </div>
                <div>
                  <CloudUploadIcon className="upload-icon" />
                </div>
                <p className="clicktoselect">Drop & Upload a file</p>
              </div>{" "} */}
                <label className="label-area">
                  <div className="upload">
                    <span className="text-danger">{isError}</span>
                    <div>

                      <input
                        type="file"
                        className="default-file-input"
                        accept=".csv, .xlsx"
                        onChange={handleFileChange}
                      />
                      <span className="browse-files">
                        Click to select a file
                      </span>

                    </div>
                    <div>
                      <CloudUploadIcon className="upload-icon" />
                    </div>
                    <p className="clicktoselect">Drop & Upload a file</p>
                  </div>
                </label>
              </>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UploadFile;
