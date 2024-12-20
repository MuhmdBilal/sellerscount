import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

interface AlertProps {
  data: any;
  alerts: any;
}
const Alerts = ({ data, alerts }: AlertProps) => {

  return (
    <div id="alerts">
      {/* <div className="login-sc-msg-box">
        <p className="mb-0 p-0">
          Some alerts require you to be logged in to Seller Central
        </p>
        <button className="btn-refresh seller-btn">Login</button>
      </div> */}
      <table className="table table-bordered  simple-alert-table mb-0">
        <tbody>
          <tr>
            <td style={{ width: " 50%" }}>
              <span className="seller-description">Amazon Share Buy Box</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span
                className={`d-flex align-items-center justify-content-end ${
                  alerts?.amazonShareBuyBox?.includes(
                    "Only one seller has had BB"
                  )
                    ? "text-warning"
                    : alerts?.amazonShareBuyBox?.includes("Never on Listing")
                    ? "text-success"
                    : alerts?.amazonShareBuyBox?.includes("Possibly") ? "text-success" : ""
                }`}
              >
                {alerts?.amazonShareBuyBox ? alerts?.amazonShareBuyBox : "-"}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ width: " 50%" }}>
              <span className="seller-description">Private Label</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span
                className={`d-flex align-items-center justify-content-end ${
                  alerts?.privateLabel?.includes(
                    "This product has few historic sellers which is a sign it could be PL"
                  )
                    ? "text-warning"
                    : alerts?.privateLabel?.includes("Unlikely")
                    ? "text-success"
                    : ""
                }`}
              >
                {alerts?.privateLabel ? (
                  <>
                    <RiErrorWarningLine size={16} className="me-1" />
                    {alerts?.privateLabel}
                  </>
                ) : (
                  "-"
                )}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ width: " 50%" }}>
              <span className="seller-description">IP Analysis</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span  className={`d-flex align-items-center justify-content-end ${
                  alerts?.ipAnalysis?.includes(
                    "have IP Issues"
                  )
                    ? "text-danger"
                    : alerts?.ipAnalysis?.includes("No known IP issues")
                    ? "text-success"
                    : ""
                }`}>
                {alerts?.ipAnalysis ? alerts?.ipAnalysis : "-"}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ width: " 50%" }}>
              <span className="seller-description">Size</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span  className={`d-flex align-items-center justify-content-end ${
                  alerts?.size?.includes(
                    "Oversize - Small"
                  )
                    ? "text-warning"
                    : alerts?.size?.includes("Standard Size")
                    ? "text-success"
                    : ""
                }`}>
                {alerts?.size ? alerts?.size : "-"}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ width: " 50%" }}>
              <span className="seller-description">Hazmat</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span className={`d-flex align-items-center justify-content-end ${
                 alerts?.hazmat ? "text-danger" : "text-success"
                }`}>
                {alerts?.hazmat ? "Yes" : "No"}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ width: " 50%" }}>
              <span className="seller-description">Meltable</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span className={`d-flex align-items-center justify-content-end ${
                 alerts?.meltable ? "text-danger" : "text-success"
                }`}>
                {alerts?.meltable ? "Yes" : "No"}
              </span>
            </td>
          </tr>
          <tr>
            <td style={{ width: " 50%" }}>
              <span className="seller-description">Variations</span>
            </td>
            <td style={{ textAlign: "right", verticalAlign: "middle" }}>
              <span className={`d-flex align-items-center justify-content-end ${
                 alerts?.variations && "text-warning"
                }`}>
                {alerts?.variations ? (
                  <>
                    <RiErrorWarningLine size={16} className=" me-1" />
                    This listing has {alerts?.variations} variations
                  </>
                ) : (
                  "-"
                )}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Alerts;
