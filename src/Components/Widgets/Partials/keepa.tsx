import React from "react";
import KeepaList from "./keepaList";
import { flagImages, valuesKeepa } from "../../../constants";
import { FaArrowRotateRight } from "react-icons/fa6";
import { Dummy } from "../../../utils";


interface KeepaProps {
  data?: any;
  selectedCountry: any;
  selectedDay: any;
  setSelectedCountry: any;
  setSelectedDay: any;
  loading: any;
}

const Keepa = ({
  data,
  selectedCountry,
  selectedDay,
  setSelectedCountry,
  setSelectedDay,
  loading,
}: KeepaProps) => {
  
  const handleCountrySelect = (item: any) => {
    setSelectedCountry(item);
  };

  const handleDaySelect = (item: any) => {
    setSelectedDay(item);
  };
  
  return (
    <div id="keepa">
      <div className="d-flex gap-2 align-items-center justify-content-center">
        <p className="seller-description mb-0 mt-1">Marketplaces:</p>
        <KeepaList
          data={flagImages}
          type="country"
          selectedItem={selectedCountry}
          onItemSelect={handleCountrySelect}
        />
      </div>

      {loading ? (
        <div className="loading-anim" style={{ overflow: "hidden" }}></div>
      ) : (
        <img src={data ? data : Dummy} alt="" className="keepa-image" />
      )}
      <div className="d-flex gap-3 align-items-center justify-content-center flex-wrap">
        <p className="seller-description mb-0 mt-1">Days:</p>
        <div style={{maxWidth: "250px", width: "100%"}}>
          <KeepaList
            data={valuesKeepa}
            selectedItem={selectedDay}
            onItemSelect={handleDaySelect}
          />
        </div>
        <button className="btn-refresh seller-btn d-flex align-items-center justify-content-center">
          <FaArrowRotateRight
            className="offer-search mx-0 "
            size={16}
          />
        </button>
      </div>
    </div>
  );
};

export default Keepa;
