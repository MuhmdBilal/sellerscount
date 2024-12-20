import React from "react";
import { Tooltip } from "@mui/material";
import { useStyles } from "../../../helpers";

interface KeepaListProps {
  data?: any;
  type?: any;
  selectedItem?: any;
  onItemSelect?: (item: any) => void;
}

const KeepaList = ({
  data,
  type,
  selectedItem,
  onItemSelect,
}: KeepaListProps) => {
  const classes = useStyles();

  const handleClick = (item: any) => {
    if (onItemSelect) {
      if (type === "country") onItemSelect(item?.key);
      else {
        onItemSelect(item);
      }
    }
  };

  return (
    <>
      <ul className="d-flex gap-2 align-items-center justify-content-center flex-wrap p-0 mb-1 mt-1">
        {data.map((item: any, index: any) => (
          <li key={index} className="list-name sample-name m-0">
            {type !== "country" ? (
              <Tooltip
                title={item === "All" ? "Lifetime" : `Average ${item} Days`}
                placement="top"
                classes={{ tooltip: classes.tooltip }}
                componentsProps={{
                  tooltip: {
                    className: "content-tooltip"
                  }
                }}
              >
                <button
                  className={`simple-link ${type === "country" && selectedItem === item?.key
                    ? "keepa-selected-link"
                    : type !== "country" && selectedItem === item
                      ? "keepa-selected-link"
                      : ""
                    }
              `}
                  onClick={() => handleClick(item)}
                >
                  {item}
                </button>
              </Tooltip>
            ) : (
              <button
                className={`simple-link ${type === "country" && selectedItem === item?.key
                  ? "keepa-selected-link"
                  : type !== "country" && selectedItem === item
                    ? "keepa-selected-link"
                    : ""
                  }
              `}
                onClick={() => handleClick(item)}
              >
                <img src={item.src} alt="" />
              </button>
            )}
          </li>
        ))}
      </ul >
    </>
  );
};

export default KeepaList;
