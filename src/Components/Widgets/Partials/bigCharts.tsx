import React, { useContext, useEffect, useState } from "react";
import { FaArrowsLeftRight } from "react-icons/fa6";
import { FaSearchPlus } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import ChartDemo from "../../charts";
import { IoArrowBackOutline } from "react-icons/io5";
import { Tooltip } from "@mui/material";
import { useStyles } from "../../../helpers";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../../context/searchContext";

const BigCharts = () => {
  const location = useLocation();
  const {
    chartsData,
    chartsFilter,
    orignalData,
    chartsLoader,
    setChartsLoader,
  } = location.state || {};
  const classes = useStyles();
  const navigate = useNavigate();
  const { setSearchValue, setIsGobalFilter } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();
  const [chartsLocalData, setChartsLocalData] = useState<any>([]);
  const [legendStyle, setLegendStyle] = useState<any>({
    enabled: true,
    verticalAlign: "top",
    align: "center",
    borderWidth: 2,
    borderColor: "rgba(192, 192, 192, 0.5)",
    borderStyle: "solid",
    borderRadius: 0,
    stroke: "rgba(192, 192, 192, 0.5)",
    strokeWidth: 1,
  });

  const [filterNumber, setFilterNumber] = useState<number>(3);

  const filterDataByTimeRange = (data: (number[] | null)[], filter: number) => {
    const currentTime = new Date().getTime();
    let timeRange = 0;
    let latestDate: Date | null = null;

    switch (filter) {
      case 0:
        timeRange = 24 * 60 * 60 * 1000;
        break;
      case 1:
        timeRange = 7 * 24 * 60 * 60 * 1000;
        break;
      case 2:
        timeRange = 30 * 24 * 60 * 60 * 1000;
        break;
      case 3:
        timeRange = 90 * 24 * 60 * 60 * 1000;
        break;
      case 4:
        timeRange = 365 * 24 * 60 * 60 * 1000;
        break;
      case 5:
        return orignalData;
      default:
        return orignalData;
    }
    const latestDateMillis = currentTime - timeRange;
    latestDate = new Date(latestDateMillis);

    const currentUnixTime = Math.floor(Date.now() / 1000);
    const earliestDate = new Date(currentUnixTime * 1000);
    let filteredData = data.map((chart, index) => {
      if (!chart || !chart.length) return chart;

      let filteredData2: any = chart.filter((item: any) => {
        const dataTime = new Date(item.date).getTime();
        return currentTime - dataTime <= timeRange;
      });

      let lastValueBeforeCutoff: any;
      if (
        (filteredData2.length === 0 && index == 9) ||
        index === 6 ||
        index === 7
      ) {
        const cutoffTime = currentTime - timeRange;

        lastValueBeforeCutoff = chart
          .filter((item: any) => {
            const dataTime = new Date(item.date).getTime();
            return dataTime < cutoffTime;
          })
          .sort(
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .shift();

        if (lastValueBeforeCutoff) {
          filteredData2.push({
            date: latestDate,
            price: lastValueBeforeCutoff?.price || 0,
          });
        }

        filteredData2.sort(
          (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      }

      let firstObject: any;
      if (index == 6) {
        firstObject = {
          date: latestDate,
          price: lastValueBeforeCutoff?.price || 0,
        };
      } else {
        firstObject = {
          date: latestDate,
          price:
            filteredData2[filteredData2.length - 1]?.price ??
            ([7, 8].includes(index) ? 1 : 0),
        };
      }

      let lastObject: any = {
        date: earliestDate,
        price:
          filteredData2[filteredData2.length - 1]?.price ??
          ([7, 8].includes(index) ? 1 : null),
      };
      filteredData2.push(firstObject);
      filteredData2.push(lastObject);
      filteredData2.sort(
        (a: any, b: any) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      return filteredData2;
    });

    return filteredData;
  };
  const handleButtonClick = () => {
    navigate("/widgets");
  };

  const handleClick = (filter: any) => {
    const filteredData = filterDataByTimeRange(chartsData, filter);
    setChartsLocalData(filteredData);
    setFilterNumber(filter);
  };

  useEffect(() => {
    if (chartsData?.length) {
      const filteredData = filterDataByTimeRange(chartsData, filterNumber);
      setChartsLocalData(filteredData);
    } else {
      setChartsLocalData([]);
    }
  }, [chartsData]);
  useEffect(() => {
    setSearchValue("");
    setIsGobalFilter("");
  }, []);
  return (
    <div className="mx-3">
      <button
        className="btn-refresh d-flex align-items-center justify-content-center gap-1"
        onClick={handleButtonClick}
      >
        <IoArrowBackOutline size={13} /> Back
      </button>
      {chartsLoader ? (
        <div className="loading-buyBox" style={{ overflow: "hidden" }}></div>
      ) : chartsLocalData?.length ? (
        <ChartDemo chartsData={chartsLocalData} legendStyle={legendStyle} />
      ) : (
        <></>
      )}

      <div className="d-flex gap-2 align-items-center flex-wrap">
        <Tooltip
          title={<div>Show 1 Day</div>}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button
            className={`discount-btn-refresh ${
              filterNumber === 0 ? "btn-refresh" : ""
            }`}
            onClick={() => handleClick(0)}
          >
            Dy
          </button>
        </Tooltip>
        <Tooltip
          title={<div>Show 1 Week</div>}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button
            className={`discount-btn-refresh ${
              filterNumber === 1 ? "btn-refresh" : ""
            }`}
            onClick={() => handleClick(1)}
          >
            Wk
          </button>
        </Tooltip>
        <Tooltip
          title={<div>Show 1 Month</div>}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button
            className={`discount-btn-refresh ${
              filterNumber === 2 ? "btn-refresh" : ""
            }`}
            onClick={() => handleClick(2)}
          >
            Mo
          </button>
        </Tooltip>
        <Tooltip
          title={<div>Show 3 Months</div>}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button
            className={`discount-btn-refresh ${
              filterNumber === 3 ? "btn-refresh" : ""
            }`}
            onClick={() => handleClick(3)}
          >
            3Mo
          </button>
        </Tooltip>
        <Tooltip
          title={<div>Show 1 Year</div>}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button
            className={`discount-btn-refresh ${
              filterNumber === 4 ? "btn-refresh" : ""
            }`}
            onClick={() => handleClick(4)}
          >
            Yr
          </button>
        </Tooltip>
        <Tooltip
          title={<div>Show All Time</div>}
          placement="top"
          classes={{ tooltip: classes.tooltip }}
        >
          <button
            className={`discount-btn-refresh ${
              filterNumber === 5 ? "btn-refresh" : ""
            }`}
            onClick={() => handleClick(5)}
          >
            All
          </button>
        </Tooltip>

        <button className="discount-btn-refresh">
          <FaArrowsLeftRight />
        </button>
        <button className="discount-btn-refresh">
          <FaSearchPlus />
        </button>
        <button className="btn-refresh">
          <FaPlusCircle />
        </button>
      </div>
    </div>
  );
};

export default BigCharts;