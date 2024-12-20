import React from "react";
import { Tooltip } from "@mui/material";
import { useInfoStyles } from "../../../helpers";

interface AlertLevel {
  level: string;
  message: string[];
}

interface Alerts {
  amazonShareBuyBox?: string;
  privateLabel?: string;
  ipAnalysis?: string;
  size?: string;
  hazmat?: boolean;
  meltable?: boolean;
  variations?: any;
  alertLevel?: AlertLevel[];
}

type AlertsMessageQuickInfoProps = {
  alerts: Alerts;
};

const AlertsMessageQuickInfo: React.FC<AlertsMessageQuickInfoProps> = ({ alerts }) => {
  const classes = useInfoStyles();
  const alertBoxStyle = {
    borderRadius: "5px",
    width: "22px",
    height: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };
  const renderAlert = (
    condition: boolean | undefined,
    tooltipMessage: string,
    label: string,
    color: string
  ) => {
    if (!condition) return null;
    return (
      <Tooltip
        title={tooltipMessage || ""}
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <div style={{ ...alertBoxStyle, backgroundColor: color, borderColor: color }}>
          {label}
        </div>
      </Tooltip>
    );
  };
  const getAlertMessage = (level: string, keyword: string): string => {
    return (
      alerts?.alertLevel
        ?.find((alert) => alert.level === level)
        ?.message.find((msg) => msg.includes(keyword)) || ""
    );
  };

  return (
    <div className="d-flex gap-2">
      {renderAlert(
        alerts?.amazonShareBuyBox?.includes("Only one seller has had BB"),
        getAlertMessage("warning", "Only one seller has had BB"),
        "BB",
        "#E8A217"
      )}

      {renderAlert(
        alerts?.privateLabel?.includes("This product has few historic sellers which is a sign it could be PL"),
        getAlertMessage("warning", "Private Label"),
        "PL",
        "#E8A217"
      )}

      {renderAlert(
        alerts?.ipAnalysis?.includes("have IP Issues"),
        getAlertMessage("danger", "IP Analysis"),
        "IP",
        "#A94442"
      )}

      {renderAlert(
        alerts?.size?.includes("Oversize - Small"),
        "",
        "S",
        "#E8A217"
      )}

      {renderAlert(
        alerts?.hazmat,
        getAlertMessage("danger", "Hazmat"),
        "H",
        "#A94442"
      )}

      {renderAlert(
        alerts?.meltable,
        getAlertMessage("danger", "Meltable"),
        "M",
        "#A94442"
      )}

      {renderAlert(
        alerts?.variations > 0,
        getAlertMessage("warning", "Variations"),
        "V",
        "#E8A217"
      )}
    </div>
  );
};

export default AlertsMessageQuickInfo;
