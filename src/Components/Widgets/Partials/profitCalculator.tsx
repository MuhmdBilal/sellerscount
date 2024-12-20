import React, { useContext, useEffect, useRef, useState } from "react";
import { Accordion, Spinner } from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoIosCalculator } from "react-icons/io";
import {
  calculateTotalFees,
  handleMaxCost,
  handleOfferValues,
  handleRoiValues,
  handleSaleValue,
  handleValues,
  transformKeys,
  useStyles,
} from "../../../helpers";
import { Tooltip } from "@mui/material";
import { ProfitContext } from "../../../context/ProfitContext";

interface ProfitCalculatorProps {
  productDetails: any;
  estimates: any;
  activeKey: any;
  setProductDetails: React.Dispatch<React.SetStateAction<any>>;
  setActiveKey: React.Dispatch<React.SetStateAction<any>>;
  handleToggle: any;
  offers: any;
  setOffers: React.Dispatch<React.SetStateAction<any>>;
  roi: any;
  setRoi: React.Dispatch<React.SetStateAction<any>>;
  totalDiscount: any;
  setFulFillmentType: React.Dispatch<React.SetStateAction<any>>;
  calculateProfit: any;
  referralFee: any;
  getOffers: any;
  offersFilter: any;
  isLoading: boolean;
  setIsStorageFee: any
}
const ProfitCalculator = ({
  productDetails,
  estimates,
  setProductDetails,
  activeKey,
  setActiveKey,
  handleToggle,
  offers,
  setOffers,
  roi,
  setRoi,
  totalDiscount,
  setFulFillmentType,
  calculateProfit,
  referralFee,
  getOffers,
  offersFilter,
  isLoading,
  setIsStorageFee
}: ProfitCalculatorProps) => {
  const isFirstRender = useRef(true);
  const classes = useStyles();
  const { setProfit, setSalePrice } =
    useContext(ProfitContext) ??
    (() => {
      throw new Error(
        "ProfitContext is undefined. Ensure the component is within SearchState."
      );
    })();

  const [isCollapsed1, setIsCollapsed1] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(true);
  const [isCollapsed3, setIsCollapsed3] = useState(true);
  const [isCollapsed4, setIsCollapsed4] = useState(true);

  const toggleCollapse1 = () => {
    setIsCollapsed1(!isCollapsed1);
  };
  const toggleCollapse2 = () => {
    setIsCollapsed2(!isCollapsed2);
  };
  const toggleCollapse3 = () => {
    setIsCollapsed3(!isCollapsed3);
  };
  const toggleCollapse4 = () => {
    setIsCollapsed4(!isCollapsed4);
  };
  let debounceTimer: NodeJS.Timeout;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let newValue = value;

    const validPattern = /^\d*\.?\d*$/;
    if (validPattern.test(newValue)) {
      const parts = newValue.split(".");
      if (parts.length === 2 && parts[1].length > 2) {
        newValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
      }
    }
    const updatedObj = JSON.parse(JSON.stringify(productDetails));

    if (name === "storage_Months") {
      setIsStorageFee(newValue)
      updatedObj.profitCalculator = {
        ...updatedObj.profitCalculator,
        [name]: Number(newValue),
        totalFees: {
          ...updatedObj.profitCalculator.totalFees,
        },
      };
    } else {
      updatedObj.profitCalculator = {
        ...updatedObj.profitCalculator,
        [name]: Number(newValue),
      };
    }
    setProductDetails(updatedObj);
      updateDetails(updatedObj, name);
  };

  const debounce = (callback: Function, delay: number) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      callback();
    }, delay);
  };

  const updateDetails = async (updatedObj: any, name: string) => {
    if (name == "costPrice") {
      const updatedValue = handleValues(
        updatedObj,
        "profitCalculator",
        totalDiscount
      );
      setProductDetails(updatedValue);
    } else {
      const updatedValue = handleSaleValue(updatedObj, "profitCalculator");
      setProductDetails(updatedValue);
    }
    const offerValues = await handleOfferValues(
      offers,
      updatedObj,
      "profitCalculator"
    );
    setOffers(offerValues);
    const roiValues = handleRoiValues(roi, updatedObj, "profitCalculator");
    setRoi(roiValues);
  };

  const handleMaxCostValue = () => {
    const updatedValue = handleMaxCost(productDetails, "profitCalculator");
    const newlyValues = handleValues(
      updatedValue,
      "profitCalculator",
      totalDiscount
    );

    setProductDetails(newlyValues);
  };

  const handleCheckboxChange = () => {
    const currentType = productDetails?.profitCalculator?.fulfilmentType;
    const newType = currentType === "FBA" ? "FBM" : "FBA";
    setFulFillmentType(newType === "FBA" ? 0 : 1);
    setProductDetails((prevState: any) => ({
      ...prevState,
      profitCalculator: {
        ...prevState.profitCalculator,
        fulfilmentType: newType,
      },
    }));
  };

  const profitCalculate = async (type?: any) => {
    try {
      await calculateProfit(productDetails, "profitCalculator", type);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCostPrices = async () => {
    try {
      const offerValues = await getOffers(
        {},
        offersFilter?.prime,
        offersFilter?.live,
        productDetails?.profitCalculator?.costPrice
      );
      setOffers(offerValues);
      const roiValues = handleRoiValues(
        roi,
        productDetails,
        "profitCalculator"
      );
      setRoi(roiValues);
      setProfit((productDetails?.profitCalculator?.costPrice * 25) / 100);
      setSalePrice(
        productDetails?.profitCalculator?.costPrice +
        calculateTotalFees(productDetails?.profitCalculator?.totalFees) +
        (productDetails?.profitCalculator?.costPrice * 25) / 100
      );
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const getData = setTimeout(() => {
      profitCalculate();
    }, 500);

    return () => clearTimeout(getData);
  }, [productDetails?.profitCalculator?.FBMCost]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const costPrice = productDetails?.profitCalculator?.costPrice;

    if (costPrice >= 0) {
      const timeoutId = setTimeout(() => {
        handleCostPrices();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [productDetails?.profitCalculator?.costPrice]);
  return (
    <Accordion activeKey={activeKey?.profitCalculator === true ? "0" : "1"}>
      <Accordion.Item eventKey="0">
        <Accordion.Header onClick={() => handleToggle("profitCalculator")}>
          <IoIosCalculator className="calculator" /> &nbsp; Profit Calculator
        </Accordion.Header>
        <Accordion.Body>
          <div id="calculator">
            <table className="table table-bordered  simple-alert-table mb-0 mt-0">
              <tbody>
                <tr>
                  <td
                    style={{ width: "50%" }}
                    className="seller-description profile-calculation"
                  >
                    Cost Price
                  </td>
                  <td>
                    <div className="form-group field-cost">
                      <div className="input-group">
                        <span
                          className="input-group-addon focus-next-input"
                          id="sas-cost-currency-symbol"
                        >
                          $
                        </span>
                        <input
                          type="number"
                          id="cost"
                          className="aj-save form-control money-input no-arrows"
                          name="costPrice"
                          value={
                            productDetails?.profitCalculator?.costPrice !==
                              undefined &&
                              productDetails?.profitCalculator?.costPrice !== null
                              ? productDetails?.profitCalculator?.costPrice ===
                                0
                                ? "0"
                                : String(
                                  productDetails?.profitCalculator?.costPrice
                                )?.startsWith("0.")
                                  ? productDetails?.profitCalculator?.costPrice
                                  : String(
                                    productDetails?.profitCalculator?.costPrice
                                  )?.replace(/^0+/, "")
                              : ""
                          }
                          step="any"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ width: "50%" }}
                    className="seller-description profile-calculation"
                  >
                    Sale Price
                  </td>
                  <td>
                    <div className="form-group field-sale_price">
                      <div className="input-group">
                        <span
                          className="input-group-addon focus-next-input"
                          id="sas-sale-currency-symbol"
                        >
                          $
                        </span>
                        <input
                          type="number"
                          id="sale_price"
                          className="aj-save form-control money-input no-arrows"
                          name="salePrice"
                          pattern="[0-9.]*"
                          // inputmode="decimal"
                          step="any"
                          value={
                            productDetails?.profitCalculator?.salePrice !==
                              undefined &&
                              productDetails?.profitCalculator?.salePrice !== null
                              ? productDetails?.profitCalculator?.salePrice ===
                                0
                                ? "0"
                                : String(
                                  productDetails?.profitCalculator?.salePrice
                                )?.startsWith("0.")
                                  ? productDetails?.profitCalculator?.salePrice
                                  : String(
                                    productDetails?.profitCalculator?.salePrice
                                  )?.replace(/^0+/, "")
                              : ""
                          }
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ width: "50%", verticalAlign: "middle" }}
                    className="seller-description profile-calculation"
                  >
                    Fulfilment Type
                  </td>
                  <td className="d-flex justify-content-end align-items-center">
                    <div className="toggler toggler-three">
                      <input
                        type="checkbox"
                        className="checkbox-desc"
                        onChange={handleCheckboxChange}
                        checked={
                          productDetails?.profitCalculator?.fulfilmentType ===
                          "FBM"
                        }
                      />
                      <label className="unchecked-label seller-description">
                        FBA
                      </label>
                      <label className="checked-label seller-description">
                        FBM
                      </label>
                      <div className="background checked-background"></div>
                      <div className="background unchecked-background"></div>
                    </div>
                  </td>
                </tr>
                {productDetails?.profitCalculator?.fulfilmentType === "FBA" ? (
                  <tr>
                    <td
                      style={{ width: "50%", verticalAlign: "middle" }}
                      className="seller-description profile-calculation"
                    >
                      Storage (Months)
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Tooltip
                        title={
                          <div className="content-tooltip">
                            {productDetails?.profitCalculator?.storage_Months}
                          </div>
                        }
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <input
                          type="range"
                          className="range"
                          name="storage_Months"
                          onChange={(e) => handleChange(e)}
                          value={
                            productDetails?.profitCalculator?.storage_Months
                          }
                          max={12}
                          step="1"
                        />
                      </Tooltip>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td
                      style={{ width: "50%" }}
                      className="seller-description profile-calculation"
                    >
                      FBM Cost
                    </td>
                    <td>
                      <div className="form-group field-fbm_fulfilment_cost has-success">
                        <div className="input-group">
                          <span
                            className="input-group-addon focus-next-input"
                            id="sas-fulfilment-cost-currency-symbol"
                          >
                            $
                          </span>
                          <input
                            type="text"
                            id="FBMCost"
                            className="form-control aj-save money-input"
                            name="FBMCost"
                            pattern="[0-9.]*"
                            value={productDetails?.profitCalculator?.FBMCost}
                            onChange={(e) => handleChange(e)}
                            aria-invalid="false"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <table
              className="table table-bordered  simple-alert-table mb-0"
              style={{ marginTop: "-4px" }}
            >
              <tbody>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Profit
                    <button
                      className="collapse-button"
                      onClick={toggleCollapse3}
                    >
                      {isCollapsed3 ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      id="saslookup-profit"
                      className="seller-description bad-hl"
                    >
                      $&nbsp;
                      {productDetails?.profitCalculator?.profit}
                    </span>
                  </td>
                </tr>
                {!isCollapsed3 && (
                  <tr className="collapsed-content p-0">
                    <td colSpan={2}>
                      <ul className="detail-items d-flex flex-column gap-2">
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">Sale Price</span>
                          <span className="seller-description">
                            {productDetails?.profitCalculator?.salePrice !==
                              undefined &&
                              productDetails?.profitCalculator?.salePrice !== null
                              ? productDetails?.profitCalculator?.salePrice ===
                                0
                                ? "0"
                                : String(
                                  productDetails?.profitCalculator?.salePrice
                                )?.startsWith("0.")
                                  ? productDetails?.profitCalculator?.salePrice
                                  : String(
                                    productDetails?.profitCalculator?.salePrice
                                  )?.replace(/^0+/, "")
                              : ""}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">Cost Price</span>
                          <span className="seller-description">
                            $&nbsp;-
                            {productDetails?.profitCalculator?.costPrice !==
                              undefined &&
                              productDetails?.profitCalculator?.costPrice !== null
                              ? productDetails?.profitCalculator?.costPrice ===
                                0
                                ? "0.00"
                                : String(
                                  productDetails?.profitCalculator?.costPrice
                                )?.startsWith("0.")
                                  ? productDetails?.profitCalculator?.costPrice
                                  : String(
                                    productDetails?.profitCalculator?.costPrice
                                  )?.replace(/^0+/, "")
                              : ""}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">Total Fees</span>
                          <span className="seller-description">
                            $&nbsp;-
                            {calculateTotalFees(
                              productDetails?.profitCalculator?.totalFees
                            )}
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ width: "50%" }} className="seller-description">
                    ROI
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      id="saslookup-profit"
                      className="seller-description bad-hl"
                    >
                      {productDetails?.profitCalculator?.roi}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description">
                    Maximum Cost
                    <button
                      className="collapse-button"
                      onClick={toggleCollapse1}
                    >
                      {isCollapsed1 ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      id="saslookup-profit"
                      className="seller-description bad-hl cursor-copy"
                      onClick={() => handleMaxCostValue()}
                    >
                      $ {productDetails?.quickInfo?.maxCost ?? "0"}
                    </span>
                  </td>
                </tr>
                {!isCollapsed1 && (
                  <tr className="collapsed-content p-0">
                    <td colSpan={2}>
                      <ul className="detail-items d-flex flex-column gap-2">
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">Min. ROI</span>
                          <span className="seller-description">25%</span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">
                            Min. Profit
                          </span>
                          <span className="seller-description">
                            $&nbsp;3.00
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Total Fees
                    <button
                      className="collapse-button"
                      onClick={toggleCollapse2}
                    >
                      {isCollapsed2 ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span id="saslookup-profit" className="seller-description">
                      $&nbsp;
                      {calculateTotalFees(
                        productDetails?.profitCalculator?.totalFees
                      )}
                    </span>
                  </td>
                </tr>
                {!isCollapsed2 && (
                  <tr className="collapsed-content p-0">
                    <td colSpan={2}>
                      <ul
                        className="detail-items d-flex flex-column gap-2"
                        style={{ width: "100%" }}
                      >
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">
                            <Tooltip
                              title={
                                <div className="referral-fee-tooltip">
                                  {referralFee ? referralFee?.toFixed(2) : "-"}%
                                </div>
                              }
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <span className="seller-description dotted-border cursor-pointer">
                                Referral Fee
                              </span>
                            </Tooltip>
                          </span>
                          <span className="seller-description">
                            $
                            {
                              productDetails?.profitCalculator?.totalFees
                                ?.referralFee
                            }
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span>
                            Fulfilment&nbsp;
                            {productDetails?.profitCalculator
                              ?.fulfilmentType === "FBM"
                              ? "FBM"
                              : "FBA"}
                          </span>
                          <span className="seller-description">
                            $
                            {productDetails?.profitCalculator
                              ?.fulfilmentType === "FBM"
                              ? productDetails?.profitCalculator?.totalFees
                                ?.fulfilment_FBM
                              : productDetails?.profitCalculator?.totalFees
                                ?.fulfilment_FBA}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span>Closing Fee</span>
                          <span className="seller-description">
                            $
                            {
                              productDetails?.profitCalculator?.totalFees
                                ?.closingFee
                            }
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span
                            className={`${productDetails?.profitCalculator
                              ?.fulfilmentType === "FBM"
                              ? "seller-description-text"
                              : "seller-description"
                              }`}
                          >
                            Storage Fee
                          </span>
                          <span className="seller-description">
                            $
                            {
                              productDetails?.profitCalculator?.totalFees
                                ?.storageFee.toFixed(4)
                            }
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span
                            className={`${productDetails?.profitCalculator
                              ?.fulfilmentType === "FBM"
                              ? "seller-description-text"
                              : "seller-description"
                              }`}
                          >
                            Prep Fee
                          </span>
                          <span className="seller-description">
                            $
                            {
                              productDetails?.profitCalculator?.totalFees
                                ?.prepFee
                            }
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span
                            className={`${productDetails?.profitCalculator
                              ?.fulfilmentType === "FBM"
                              ? "seller-description-text"
                              : "seller-description"
                              }`}
                          >
                            Inbound Shipping
                          </span>
                          <span className="seller-description">
                            $
                            {
                              productDetails?.profitCalculator?.totalFees
                                ?.inboundShipping
                            }
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span>
                            <Tooltip
                              title={
                                <div className="referral-fee-tooltip">
                                  Estimated maximum Inbound Placement Service
                                  fee for Amazon Optimized Splits. Storage Fee
                                  <br />
                                  <br />
                                  Click to cycle through the different Inbound
                                  Placement services.
                                </div>
                              }
                              placement="top"
                              classes={{ tooltip: classes.tooltip }}
                            >
                              <span
                                className={`${productDetails?.profitCalculator
                                  ?.fulfilmentType === "FBM"
                                  ? "seller-description-text"
                                  : "seller-description"
                                  }`}
                              >
                                Inbound Placement (O)
                              </span>
                            </Tooltip>
                          </span>
                          <span className="seller-description">
                            $
                            {
                              productDetails?.profitCalculator?.totalFees
                                ?.inboundPlacement_O
                            }
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span>Misc Fee</span>
                          <span className="seller-description">
                            $
                            {
                              productDetails?.profitCalculator?.totalFees
                                ?.miscFee
                            }
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span>Misc Fee (% of cost)</span>
                          <span className="seller-description">
                            $
                            {
                              productDetails?.profitCalculator?.totalFees
                                ?.miscFee_PercentageOfCost
                            }
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Discount
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span id="saslookup-profit" className="seller-description">
                      $&nbsp;
                      {totalDiscount
                        ? (
                          (productDetails?.profitCalculator?.costPrice *
                            totalDiscount) /
                          100
                        )?.toFixed(2)
                        : productDetails?.profitCalculator?.discount ?? "0"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Profit Margin
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span id="saslookup-profit" className="seller-description">
                      {productDetails?.profitCalculator?.profitMargin ?? "0"}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description ">
                    Breakeven Sale Price
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span id="saslookup-profit" className="seller-description">
                      $&nbsp;
                      {productDetails?.profitCalculator?.breakevenSalePrice ??
                        "0"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "50%" }} className="seller-description">
                    Estimated Amz. Payout
                    <button className="collapse-button" onClick={toggleCollapse4}>
                      {isCollapsed4 ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span id="saslookup-profit" className="seller-description">
                      $&nbsp;
                      {estimates?.payout?.toFixed(2)}
                    </span>
                  </td>
                </tr>
                {!isCollapsed4 && (
                  <tr className="collapsed-content p-0">
                    <td colSpan={2}>
                      <ul className="detail-items d-flex flex-column gap-2">
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">Sale Price</span>
                          <span className="seller-description">
                            $&nbsp;
                            {estimates.salePrice?.toFixed(2)}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">Referral Fee</span>
                          <span className="seller-description">
                            - $&nbsp;
                            {estimates.referralFee?.toFixed(2)}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">Fulfilment Fee</span>
                          <span className="seller-description">
                            - $&nbsp;
                            {estimates?.fulfilmentFee?.toFixed(2)}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between align-items-center">
                          <span className="seller-description">Closing Fee</span>
                          <span className="seller-description">
                            $&nbsp;
                            {estimates?.closingFee?.toFixed(2)}
                          </span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>

            <table
              className="table table-bordered  simple-alert-table mb-0 "
              style={{ marginTop: "-4px" }}
            >
              <tbody>
                <tr>
                  <td
                    style={{ width: "50%" }}
                    className="seller-description profile-calculation "
                  >
                    <Tooltip
                      title={
                        <div>
                          Enter quantity to see quick summary calculations and
                          for export to Google Sheets or STK
                        </div>
                      }
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <div
                        className="seller-description "
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        rel="noopener noreferrer"
                      >
                        <span className="seller-description dotted-border cursor-pointer">
                          Quantity
                        </span>
                      </div>
                    </Tooltip>
                  </td>
                  <td>
                    <div className="input-group ">
                      <input
                        type="text"
                        id="quantity"
                        className="aj-save form-control number-input"
                        pattern="[0-9]*"
                        // inputmode="number"
                        step="any"
                        name="quantity"
                        value={productDetails?.profitCalculator?.quantity}
                        onChange={(e) => handleChange(e)}
                        style={{ textAlign: "right" }}
                      />
                    </div>
                  </td>
                </tr>
                {productDetails?.profitCalculator?.quantity !== 1 ? (
                  <>
                    <tr>
                      <td
                        style={{ width: "50%" }}
                        className="seller-description profile-calculation "
                      >
                        <span className="row-sub-caption">Cost</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <span className="quantity-total-cost-price">
                          $&nbsp;
                          {productDetails?.profitCalculator?.costPrice *
                            productDetails?.profitCalculator?.quantity}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "50%" }}
                        className="seller-description profile-calculation"
                      >
                        <span className="row-sub-caption">Sale</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <span className="quantity-total-cost-price">
                          $&nbsp;
                          {(
                            productDetails?.profitCalculator?.salePrice *
                            productDetails?.profitCalculator?.quantity
                          )?.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "50%" }}
                        className="seller-description profile-calculation"
                      >
                        <span className="row-sub-caption">Total Profit</span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <span className="quantity-total-cost-price">
                          $&nbsp;
                          {(
                            productDetails?.profitCalculator?.profit *
                            productDetails?.profitCalculator?.quantity
                          )?.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ProfitCalculator;
