import React, { useContext, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./index.css";
import Button from "../Button";
import { Col, Row } from "react-bootstrap";
import { SearchContext } from "../../context/searchContext";

const accordionData = [
  {
    id: 1,
    title: "Getting Installed",
    content: [
      {
        text: "Please click below to install the appropriate Mobile App",
        buttons: [
          { text: "Apple", buttonColor: "#FBBC31" },
          {
            text: "Android",
            buttonColor: "#FFFFFF",
            fontColor: "#6C6C6C",
            borderColor: "#FBBC31",
          },
        ],
      },
      {
        text: "To get the Chrome Extension visit",
        buttons: [{ text: "Chrome Store", buttonColor: "#FBBC31" }],
      },
      {
        text: "Want to SAS without installing anything, use (and bookmark) the Web App below",
        buttons: [{ text: "Sas.Selleramp.com", buttonColor: "#FBBC31" }],
      },
      {
        text: "We have designed SAS to be as intuitive to use as possible but we all need help from time to time. You can get help via our",
        buttons: [
          { text: "Facebook Group", buttonColor: "#FBBC31" },
          {
            text: "Email",
            buttonColor: "#FFFFFF",
            fontColor: "#6C6C6C",
            borderColor: "#FBBC31",
          },
        ],
      },
    ],
  },
];

const Help: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };
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
    <section className="px-1 px-md-4">
      <div className="accordion-container ">
        {accordionData.map((item) => (
          <div key={item.id} className="accordion-item-help">
            <div
              className="accordion-title-help d-flex justify-content-between align-items-center"
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
              <div className="accordion-content-help">
                <Row className="gy-3">
                  {item.content.map((contentItem, index) => (
                    <Col key={index} lg={6} md={6} sm={12}>
                      <div className="accordion-Card-help ">
                        <ul className="pb-3 ">
                          <li>{contentItem.text}</li>
                        </ul>
                        <div className="button-group d-flex gap-2">
                          {contentItem.buttons.map((button, i) => (
                            <Button
                              key={i}
                              buttonText={button.text}
                              buttonColor={button.buttonColor}
                              borderColor={button.borderColor}
                              fontColor={button.fontColor}
                            />
                          ))}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
                <p className="text-center pt-3">
                  All prices are grandfathered for the life of your
                  subscription. Charges are not refundable once completed.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Help;
