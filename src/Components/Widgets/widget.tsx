import React from "react";
import { Accordion } from "react-bootstrap";
import { FaChartPie, FaShoppingCart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { FaAmazon } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TiWorld } from "react-icons/ti";
import { PiSquaresFourFill } from "react-icons/pi";
import { FaBell } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa6";
import { Tooltip } from "@mui/material";
import { useStyles } from "../../helpers";
import AlertBoxes from "../AlertBox/AlertBoxes";

interface widgetProps {
  icon: any;
  title: any;
  activeKey: any;
  setActiveKey: React.Dispatch<React.SetStateAction<any>>;
  handleToggle: any;
  children: any;
  data?: any;
  alerts?: any;
  variations?: any;
}

const Widget = ({
  icon,
  title,
  activeKey,
  setActiveKey,
  handleToggle,
  children,
  data,
  alerts,
  variations,
}: widgetProps) => {
  const classes = useStyles();
  const getActiveKey = (): string => {
    if (title === "Offers" && activeKey?.offers) {
      return activeKey.offers ? "0" : "1";
    } else if (title === "Buy Box Analysis" && activeKey?.buyBoxAnalysis) {
      return activeKey.buyBoxAnalysis ? "0" : "1";
    } else if (title === "Seller Central" && activeKey?.sellerCentral) {
      return activeKey.sellerCentral ? "0" : "1";
    } else if (title === "Vat Settings" && activeKey?.vatSettings) {
      return activeKey.vatSettings ? "0" : "1";
    } else if (
      title === "European Marketplaces" &&
      activeKey?.europeanMarketPlaces
    ) {
      return activeKey.europeanMarketPlaces ? "0" : "1";
    } else if (title === "Lookup Details" && activeKey?.lookupDetails) {
      return activeKey.lookupDetails ? "0" : "1";
    } else if (title === "Variations" && activeKey?.variations) {
      return activeKey.variations ? "0" : "1";
    } else if (title === "R.O.I." && activeKey?.roi) {
      return activeKey.roi ? "0" : "1";
    } else if (title === "Geo location" && activeKey?.geolocation) {
      return activeKey.geolocation ? "0" : "1";
    } else if (title === "Keepa" && activeKey?.keepa) {
      return activeKey.keepa ? "0" : "1";
    } else if (title === "Search Again" && activeKey?.search) {
      return activeKey.search ? "0" : "1";
    } else if (title === "Notes & Tags" && activeKey?.notesTags) {
      return activeKey.notesTags ? "0" : "1";
    } else if (title === "eBay" && activeKey?.eBay) {
      return activeKey.eBay ? "0" : "1";
    } else if (title === "Alerts" && activeKey?.alerts) {
      return activeKey.alerts ? "0" : "1";
    } else if (title === "Discounts" && activeKey?.discounts) {
      return activeKey.discounts ? "0" : "1";
    } else if (title === "Charts" && activeKey?.charts) {
      return activeKey.charts ? "0" : "1";
    }
    return "1";
  };

  const onHeaderClick = () => {
    let key = null;
    switch (title) {
      case "eBay":
        key = "eBay";
        break;
      case "Offers":
        key = "offers";
        break;
      case "Seller Central":
        key = "sellerCentral";
        break;
      case "Search Again":
        key = "search";
        break;
      case "Notes & Tags":
        key = "notesTags";
        break;
      case "Geo location":
        key = "geolocation";
        break;
      case "Vat Settings":
        key = "vatSettings";
        break;
      case "Discounts":
        key = "discounts";
        break;
      case "European Marketplaces":
        key = "europeanMarketPlaces";
        break;
      case "R.O.I.":
        key = "roi";
        break;
      case "Lookup Details":
        key = "lookupDetails";
        break;
      case "Alerts":
        key = "alerts";
        break;
      case "Keepa":
        key = "keepa";
        break;
      case "Variations":
        key = "variation";
        break;
      case "Buy Box Analysis":
        key = "buyBoxAnalysis";
        break;
      case "Charts":
        key = "charts";
        break;
      default:
        break;
    }
    if (key) {
      handleToggle(key);
    }
  };
  return (
    <Accordion activeKey={getActiveKey()} className="position-relative">
      <Accordion.Item eventKey="0">
        <Accordion.Header onClick={onHeaderClick}>
          <div className="d-flex gap-1">
            {icon === "shoppingcart" && (
              <FaShoppingCart className="offer-cart" />
            )}
            {icon === "amazon" && <FaAmazon className="offer-cart" />}
            {icon === "search" && <CiSearch className="offer-search" />}
            {icon === "e" && (
              <span className="me-2">
                <b>e</b>
              </span>
            )}
            {icon === "keepa" && <FaPlusCircle className="offer-search" />}
            {icon === "alert" && <FaBell className="offer-search" />}
            {icon === "flag" && <FaTag className="offer-cart" />}
            {icon === "location" && <FaLocationDot className="offer-cart" />}
            {icon === "scale" && <FaBalanceScale className="offer-search" />}
            {icon === "roi" && <SlCalender className="offer-search" />}
            {icon === "discounts" && (
              <span className="me-2">
                <b>%</b>
              </span>
            )}
            {icon === "market" && <TiWorld className="offer-search" />}
            {icon === "eye" && <FaRegEye className="offer-search" />}
            {icon === "blocks" && (
              <PiSquaresFourFill className="offer-search" />
            )}
            {icon === "piechart" && <FaChartPie className="offer-search" />}
            {icon === "charts" && <FaChartLine className="offer-search" />}
            {title}
          </div>
          {icon === "alert" && (
            <div className="d-flex justify-content-end w-100 pe-2">
              <AlertBoxes alertLevels={alerts?.alertLevel} />
            </div>
          )}
          {variations?.length > 0 && (
            <>
              {icon === "blocks" && (
                <div className="d-flex justify-content-end w-100 pe-2">
                  <div
                    style={{
                      backgroundColor: "#5BC0DE",
                      borderColor: "#5BC0DE",
                      color: "white",
                      borderRadius: "5px",
                      width: "22px",
                      height: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {variations?.length}
                  </div>
                </div>
              )}
            </>
          )}
          {data?.alerts?.variations && title === "Alerts" ? (
            <div className="d-flex justify-content-end align-items-end flex-row w-100">
              <Tooltip
                title={
                  <>
                    Amazon Share Buy Box:
                    {data?.alerts?.amazonShareBuyBox
                      ? data?.alerts?.amazonShareBuyBox
                      : " - "}
                    <br /> IP Analysis
                    {data?.alerts?.ipAnalysis
                      ? data?.alerts?.ipAnalysis
                      : " - "}
                    <br /> Size:
                    {data?.alerts?.size ? data?.alerts?.size : " - "} <br />
                    Meltable: {data?.alerts?.meltable ? " Yes " : " No "}
                    <br />
                    Low Price Fee: -
                  </>
                }
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <div className="styled-box warning-background">5</div>
              </Tooltip>
              <Tooltip
                title={
                  <div>
                    {"Variations: This listing has " +
                      data?.alerts?.variations +
                      " variations"}
                  </div>
                }
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <div className="styled-box warning-background">
                  {data?.alerts?.variations}
                </div>
              </Tooltip>
            </div>
          ) : (
            <></>
          )}
        </Accordion.Header>
        <Accordion.Body>{children}</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Widget;
