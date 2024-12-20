import React from "react";
import LookUp from "./lookupDetails";
import { IoIosSave } from "react-icons/io";
import { lookupdata, lookupheading, lookuptext } from "../../../constants";
import Button from "./button";
import { ImCross } from "react-icons/im";
import { FaArrowRotateRight } from "react-icons/fa6";

const VLookupDetails = () => {
  return (
    <div id="lookup">
      <div className="vlookup-box d-flex gap-2 align-items-center mb-2">
        <div className="d-flex gap-2 w-100 pt-1 pb-1 ps-1 pe-1">
          <input
            type="search"
            className="input-group form-control inputs-search "
          />
          <button className="btn-refresh seller-btn flex-btns">
            <IoIosSave className="offers-box" />
          </button>
          <button className="btn-refresh seller-btn flex-btns">
            <FaArrowRotateRight className="offer-search mx-0 " size={16} />
          </button>
          <button className="btn-refresh seller-btn flex-btns">
            <ImCross className="offers-box" />
          </button>
        </div>
      </div>
      <LookUp
        heading={lookupheading}
        data={lookupdata}
        type="lookup"
        value="value"
      />
      <div className="">
        <Button data={lookuptext} />
      </div>
    </div>
  );
};

export default VLookupDetails;
