import React, { useContext, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./index.css";
import Button from "../Button";
import { SearchContext } from "../../context/searchContext";

const Subscription: React.FC = () => {
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
      <div className="subscription-container pt-2">
        <div className="subscription-item">
          <div className="subscription-title d-flex justify-content-between align-items-center">
            <h2 className="mb-0"> Subscription Details</h2>
          </div>
          <div className="subscription-content ">
            <Form>
              <Row className="d-flex gap-1 px-3 pb-1 ">
                <Col lg={12} md={12} xs={12}>
                  <Form.Group className="subscription-form-group">
                    <Form.Label className="">Username</Form.Label>
                    <input
                      type="text"
                      className=" "
                      placeholder="Quick Info"
                      maxLength={50}
                    />
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Form.Group className="subscription-form-group btn-input">
                    <Form.Label className=""> Plan</Form.Label>
                    <input
                      type="text"
                      className=" "
                      placeholder="SellerAmp SAS - Getting Serious"
                      maxLength={50}
                    />
                    <div className="form-btns">
                      <Button
                        buttonText={"Upgrade"}
                        buttonColor={"#FBBC31"}
                        buttonWidth="78px"
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Form.Group className="subscription-form-group btn-input">
                    <Form.Label className="">Payment Card</Form.Label>
                    <input
                      type="text"
                      className=" "
                      placeholder="...2049 expire 6/2028"
                      maxLength={50}
                    />
                    <div className="form-btns">
                      <Button
                        buttonText={"Update"}
                        buttonColor={"#FBBC31"}
                        buttonWidth="78px"
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Form.Group className="subscription-form-group btn-input">
                    <Form.Label className="">Renews on</Form.Label>
                    <input
                      type="text"
                      className=" "
                      placeholder="2024-08-25"
                      maxLength={50}
                    />
                    <div className="form-btns">
                      <Button
                        buttonText={"Cancel"}
                        buttonColor={"#FBBC31"}
                        buttonWidth="78px"
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Form.Group className="subscription-form-group">
                    <Form.Label className="">Next Payment</Form.Label>
                    <input
                      type="text"
                      className=" "
                      placeholder="$ 27.95"
                      maxLength={50}
                    />
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Form.Group className="subscription-form-group">
                    <Form.Label className="">Max Mobile Installs</Form.Label>
                    <input
                      type="text"
                      className=" "
                      placeholder="3"
                      maxLength={50}
                    />
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Form.Group className="subscription-form-group">
                    <Form.Label className="">Max Extension Installs</Form.Label>
                    <input
                      type="text"
                      className=" "
                      placeholder="5"
                      maxLength={50}
                    />
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Form.Group className="subscription-form-group">
                    <Form.Label className="">Lookups This Month</Form.Label>
                    <input
                      type="text"
                      className=" "
                      placeholder="148 of unlimited"
                      maxLength={50}
                    />
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Form.Group className="subscription-form-group">
                    <Form.Label className="">Lookups All Time</Form.Label>
                    <input
                      type="text"
                      className=" "
                      placeholder="1,559"
                      maxLength={50}
                    />
                  </Form.Group>
                </Col>
                <Col lg={12} md={12} xs={12}>
                  <Form.Group className="subscription-form-group">
                    <Form.Label className="">Modify Subscription</Form.Label>
                    <input
                      type="text"
                      className=" "
                      placeholder="Contact :"
                      maxLength={50}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
