import React, { useContext, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./index.css";
import { CiFilter } from "react-icons/ci";
import Button from "../Button";
import Banner from "../Banner";
import { SearchContext } from "../../context/searchContext";

const accordionData = [
  {
    id: 1,
    title: "Google Account",
    content: [
      "In order to use Google Sheets we need to connect to your Google Account",
      "Once your Google account is connected you can create and edit your spreadsheets as needed",
    ],
  },
];

const Sheets: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(1);
  const { setSearchValue, setIsGobalFilter } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();
  const toggleAccordion = (id: number) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };
  useEffect(() => {
    setSearchValue("");
    setIsGobalFilter("");
  }, []);
  return (
    <section className="sheets-container px-4">
      <Banner
        bannerText={
          "Use of Google Chrome and the SAS Chrome Extension are required for full functionality and all features in the SAS Web App. install the SAS "
        }
        bannerlink={"Chrome Extension."}
      />
      <div className="d-flex justify-content-between">
        <h1 className="title-heading">Sheets</h1>
        <div className="filter-box d-flex justify-content-center align-items-center">
          <CiFilter />
        </div>
      </div>
      <div className="accordion-container">
        {accordionData.map((item) => (
          <div key={item.id} className="accordion-item-sheets">
            <div
              className="accordion-title-sheets d-flex justify-content-between align-items-center"
              onClick={() => toggleAccordion(item.id)}
            >
              <h2 className="mb-0">{item.title}</h2>
              <FaChevronDown
                className={`chevron-icon ${
                  activeAccordion === item.id ? "rotate" : ""
                }`}
              />
            </div>
            {activeAccordion === item.id && (
              <div className="accordion-content-sheets">
                <ul>
                  {item.content.map((contentItem, index) => (
                    <li key={index}>{contentItem}</li>
                  ))}
                </ul>
                <div className="btn-box">
                  <Button
                    buttonText={"Connect Google Account"}
                    buttonColor={"#FBBC31"}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sheets;
