import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip } from "@mui/material";
import { useInfoStyles } from "../../../helpers";
type AlertLevel = {
  level: "success" | "warning" | "danger";
  message: string[];
};

type AlertBoxesProps = {
  alertLevels: AlertLevel[];
};

const AlertBoxes: React.FC<AlertBoxesProps> = ({ alertLevels }) => {
  const classes = useInfoStyles();
  const getColor = (level: string): string => {
    switch (level) {
      case "success":
        return "#3C763D";
      case "warning":
        return "#E8A217";
      case "danger":
        return "#A94442";
      default:
        return "gray";
    }
  };

  return (
    <div className="d-flex gap-2">
      {alertLevels?.map((alert, index) => {
        const hasMessages = alert.message.length > 0;
        const boxContent = (
          <div
            style={{
              backgroundColor: getColor(alert.level),
              borderColor: getColor(alert.level),
              color: hasMessages ? "white" : "lightgray",
              borderRadius: "5px",
              width: "22px",
              height: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {alert.message.length}
          </div>
        );
        return hasMessages ? (
          <div className="alert-tooltips">
            <Tooltip
              title={
                <div>
                  {alert.message.map((msg, idx) => (
                    <div className="text-start pt-1" key={idx}>
                      {msg}
                    </div>
                  ))}
                </div>
              }
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              {boxContent}
            </Tooltip>
          </div>
        ) : (
          <div key={index}>{boxContent}</div>
        );
      })}
    </div>
  );
};

export default AlertBoxes;
