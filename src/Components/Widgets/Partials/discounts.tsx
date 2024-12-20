import React, { useState } from "react";
import { handleValues } from "../../../helpers";

interface Discount {
  type: string;
  title: string;
  value: string;
}

interface DiscountsProps {
  data: Discount[];
  productDetails: any;
  setProductDetails: any;
  setTotalDiscount: any;
}

const Discounts = ({
  data,
  productDetails,
  setProductDetails,
  setTotalDiscount,
}: DiscountsProps) => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleClick = (index: number) => {
    const selectedIndex = selectedIndexes.indexOf(index);
    let updatedIndexes;

    if (selectedIndex === -1) {
      updatedIndexes = [...selectedIndexes, index];
    } else {
      updatedIndexes = [...selectedIndexes];
      updatedIndexes.splice(selectedIndex, 1);
    }

    setSelectedIndexes(updatedIndexes);

    calculateTotalDiscount(updatedIndexes)
      .then((totalDiscount) => {
        setTotalDiscount(totalDiscount);
        const updatedValue = handleValues(
          productDetails,
          "quickInfo",
          totalDiscount
        );
        setProductDetails(updatedValue);
      })
      .catch((error) => {
        console.error("Error calculating total discount:", error);
      });
  };

  const calculateTotalDiscount = async (indexes: number[]) => {
    let totalDiscount = 0;
    indexes.forEach((index) => {
      if (data[index].title === "3 for 2") {
        totalDiscount += 33.34;
      } else {
        totalDiscount += parseFloat(data[index].title);
      }
    });

    return totalDiscount?.toFixed(2);
  };

  return (
    <div id="discounts">
      <div className="offers-content d-flex gap-2 flex-wrap">
        {data?.map((item: Discount, index: number) => (
          <button
            key={index}
            type="button"
            className={`seller-btn ${
              selectedIndexes.includes(index)
                ? "btn-refresh btn-streched"
                : "seller-btn-discounts"
            }`}
            onClick={() => handleClick(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Discounts;
