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
    title: "Instructions",
    content: [
      {
        type: "paragraph",
        text: "Inorder to enable your Seller Tool Kit SAS Panel we need to connect to your Seller Tool Kit account.",
      },
      {
        type: "paragraph",
        text: (
          <>
            Login or sign-in for a Seller Tool Kit account.You can use this
            <a href="/">sign-up link</a> for 30% discount on your first month.
          </>
        ),
      },
      {
        type: "input",
        label: "Seller Tool Kit Token",
        text: (
          <>
            Within <a href="/">Seller Tool Kit</a> go to your Settings page and
            cick the SAS Link Token ab. Create and copy the token into the field
            below.
          </>
        ),
      },
      {
        type: "paragraph",
        text: (
          <>
            After clicking ‘Update’ your Seller Tool Kit account will be
            connected to SAS.You can now enable the STK SAS Panel via your
            <a href="/">profile page.</a>
          </>
        ),
      },
    ],
    imageSrc: "/images/seller-logo.svg",
  },
];

const Instructions: React.FC = () => {
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
      <Container>
        <Banner
          bannerText={
            "Use of Google Chrome and the SAS Chrome Extension are required for full functionality and all features in the SAS Web App. install the SAS "
          }
          bannerlink={"Chrome Extension."}
        />
        <div className="d-flex justify-content-between ">
          <h1 className="instructions-title-heading ">Integrations</h1>
        </div>

        <div className="instructions-container">
          {accordionData.map((item) => (
            <div key={item.id} className="instructions-item">
              <div className="instructions-title d-flex justify-content-between align-items-center">
                <h2 className="mb-0">{item.title}</h2>
              </div>
              <div className="instructions-content ">
                <div className="d-flex flex-column flex-md-row gap-0  gap-md-5 align-items-start">
                  <img
                    src={item.imageSrc}
                    alt={`${item.title} logo`}
                    className="instructions-image"
                  />
                  <div className="pb-2">
                    <ol type="1">
                      {item.content.map((contentItem, index) => (
                        <li key={index} className="pt-2">
                          {contentItem.type === "paragraph" ? (
                            contentItem.text
                          ) : contentItem.type === "input" ? (
                            <div>
                              <p>{contentItem.text}</p>
                              <div className="instructions-kit d-flex flex-column">
                                <label className="label-item">
                                  {contentItem.label}
                                </label>
                                <input type="text" />
                              </div>
                            </div>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-end gap-4 mt-3">
          <Button
            buttonText={"Update"}
            buttonColor={"#FBBC31"}
            borderColor={"transparent"}
            buttonWidth="132px"
          />
          <Button
            buttonText={"Cancel"}
            buttonColor={"transparent"}
            borderColor="#FBBC31"
            fontColor="#6C6C6C"
            buttonWidth="125px"
          />
        </div>
      </Container>
    </section>
  );
};

export default Instructions;
