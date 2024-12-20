import React from "react";
import LookUp from "./lookupDetails";
import { roiheading } from "../../../constants";

interface RoiProps {
  data?: any;
  productDetails: any;
  roiData: any;
}
const Roi = ({ data, productDetails, roiData }: RoiProps) => {
  return (
    <div id="roiii">
      <LookUp
        heading={roiheading}
        data={roiData}
        type="roi"
        value="value"
      />
      <p className="seller-description pb-0 mt-2 mb-0">
        Based on your cost price of $
        {productDetails?.quickInfo?.costPrice?.toFixed(2)}
      </p>
    </div>
  );
};

export default Roi;
