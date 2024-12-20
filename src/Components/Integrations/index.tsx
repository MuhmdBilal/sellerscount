import React, { useContext, useEffect } from "react";
import { Container } from "@mui/material";
import "./index.css";
import { CiFilter } from "react-icons/ci";
import Button from "../Button";
import Banner from "../Banner";
import { SearchContext } from "../../context/searchContext";

const accordionData = [
  {
    id: 1,
    title: "Arbitrage Hero",
    content: [
      {
        type: "paragraph",
        text: "No More Aches Neck Pillow for Pain Relief, Adjustable Cervical Support with Armrest, Odorless Ergonomic Contour Memory Foam Pillows,Orthopedic Bed Side Back Stomach Sleeping.",
      },
      {
        type: "paragraph",
        text: "Connect your AH account to SAS, when analyzing a product in SAS we use Arbitrage Hero to do a reverse search for that product on other merchants websites.",
      },
    ],
    imageSrc: "/images/arbitage-logo.svg",
    buttons: [
      { buttonText: "Connect to Arbitrage Hero", buttonColor: "#FBBC31" },
      {
        buttonText: "Sign-up to Arbitrage Hero",
        buttonColor: "#FFFFFF",
        borderColor: "#314D7F",
        fontColor: "#314D7F",
      },
    ],
  },
  {
    id: 2,
    title: "BQool",
    content: [
      {
        type: "paragraph",
        text: "Autonomous machine learning technology designed to continuously win the Buy Box for greater sales & profits.",
      },
      {
        type: "paragraph",
        text: "Connect your BQool account to SAS, to see information about your current inventory when analyzing and quickly set your COGs and repricing strategies in BQool.",
      },
    ],
    imageSrc: "/images/bqool-logo.svg",
    buttons: [
      { buttonText: "Connect to BQool", buttonColor: "#FBBC31" },
      {
        buttonText: "Sign-up to BQool",
        buttonColor: "#FFFFFF",
        borderColor: "#314D7F",
        fontColor: "#314D7F",
      },
    ],
  },
  {
    id: 3,
    title: "Seller Tool Kit",
    content: [
      {
        type: "paragraph",
        text: "Seller Tool Kit provides advanced features for sellers.",
      },
      {
        type: "list",
        items: [
          "Inventory Management",
          "Inventory Reconciliation",
          "Manual & Auto Repricing",
          "Much More...",
        ],
      },
      {
        type: "paragraph",
        text: "Connect your STK account to SAS, quickly see your current stock levels, prices and previous sales.",
      },
    ],
    imageSrc: "/images/seller-logo.svg",
    buttons: [
      { buttonText: "Connect to Seller Tool Kit", buttonColor: "#FBBC31" },
      {
        buttonText: "Sign-up to Seller Tool Kit",
        buttonColor: "#FFFFFF",
        borderColor: "#314D7F",
        fontColor: "#314D7F",
      },
    ],
  },
  {
    id: 4,
    title: "Google Sheets",
    content: [
      { type: "paragraph", text: "By using Google Sheets with SAS you can:" },
      {
        type: "list",
        items: [
          "Quickly exports products to your Google Buy Sheets",
          "Create one or more spreadsheets what ever fits your business process",
          "Export to any sheet in the same spreadsheet",
          "Customise which fields are exported",
        ],
      },
    ],
    imageSrc: "/images/googlesheet-logo.svg",
    buttons: [
      { buttonText: "Connect to Google Sheets", buttonColor: "#FBBC31" },
    ],
  },
];

const Integrations: React.FC = () => {
  const { setSearchValue, setIsGobalFilter } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();
  useEffect(() => {
    setSearchValue("");
    setIsGobalFilter("");
  }, []);
  return (
    <section className="px-4">
      {/* <Banner bannerText={"Use of Google Chrome and the SAS Chrome Extension are required for full functionality and all features in the SAS Web App. install the SAS "} bannerlink={"Chrome Extension."} /> */}
      <div className="d-flex justify-content-between align-items-center ">
        <h1 className="title-heading">Integrations</h1>
        {/* <div className="filter-box d-flex justify-content-center align-items-center">
                    <CiFilter />
                </div> */}
      </div>
      <div className="accordion-container-integrations">
        {accordionData.map((item) => (
          <div key={item.id} className="accordion-item-integrations">
            <div className="accordion-title-integrations d-flex justify-content-between align-items-center">
              <h2 className="mb-0">{item.title}</h2>
            </div>
            <div className="accordion-content-integrations ">
              <div className="d-flex flex-md-row flex-column  gap-2 gap-md-4 align-items-start">
                <img
                  src={item.imageSrc}
                  alt={`${item.title} logo`}
                  className="integration-image"
                />
                <div className="pb-2 mb-1 integration-lists">
                  {item.content.map((contentItem, index) =>
                    contentItem.type === "paragraph" ? (
                      <p key={index}>{contentItem.text}</p>
                    ) : (
                      contentItem.items && (
                        <ul key={index}>
                          {contentItem.items.map((listItem, idx) => (
                            <li key={idx}>{listItem}</li>
                          ))}
                        </ul>
                      )
                    )
                  )}
                </div>
              </div>
              <div className="btn-box-integrations d-flex flex-md-row flex-column gap-2 gap-md-4">
                {item.buttons.map((button, index) => (
                  <Button
                    key={index}
                    buttonText={button.buttonText}
                    buttonColor={button.buttonColor}
                    borderColor={button.borderColor}
                    fontColor={button.fontColor}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Integrations;
