import React, { useContext, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Banner from "../Banner";
import Button from "../Button";
import DraggableInputs from "../Draggableinput";
import "./index.css";
import { SearchContext } from "../../context/searchContext";

const Panels: React.FC = () => {
    const { setSearchValue, setIsGobalFilter } =
        useContext(SearchContext) ??
        (() => {
            throw new Error(
                "SearchContext is undefined. Ensure the component is within SearchState."
            );
        })()
    useEffect(() => {
        setSearchValue("")
        setIsGobalFilter("")
    }, [])
    return (
        <section className="px-4">
            {/* <Banner bannerText={"Use of Google Chrome and the SAS Chrome Extension are required for full functionality and all features in the SAS Web App. install the SAS "} bannerlink={"Chrome Extension."} /> */}
            <Row>
                <Col>
                    <div className="panels-container">
                        <div className="panels-item">
                            <div className="panels-title d-flex justify-content-between align-items-center">
                                <h2 className="mb-0"> User Details</h2>
                            </div>
                            <div className="panels-content">
                                <Form>
                                    <Row className="d-flex gap-1 px-2 py-2 " >
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel'>
                                                <Form.Label className=''> User Name</Form.Label>
                                                <input
                                                    type="text"
                                                    className=''
                                                    placeholder="mosesalhakim"
                                                    maxLength={50}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Email</Form.Label>
                                                <input
                                                    type="email"
                                                    className=''
                                                    placeholder="mosesalhakim@gmail.com"
                                                    maxLength={50}
                                                />
                                                <div className="form-btns-panels">
                                                    <Button buttonText={"Change"} buttonColor={"#FBBC31"} buttonWidth="78px" />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Subscription</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Getting Serious"
                                                    maxLength={50}
                                                />
                                                <div className="form-btns-panels">
                                                    <Button buttonText={"Modify/Cancel"} buttonColor={"#FBBC31"} buttonWidth="96px" />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Password</Form.Label>
                                                <input
                                                    type="Password"
                                                    className=' '
                                                    placeholder="******"
                                                    maxLength={50}
                                                />
                                                <div className="form-btns-panels">
                                                    <Button buttonText={"Reset"} buttonColor={"#FBBC31"} buttonWidth="78px" />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel relative'>
                                                <Form.Label>Home Marketplace</Form.Label>
                                                <Form.Control as="select" defaultValue="Amazon.com" className="custom-panels-select">
                                                    <option value="Amazon.com">Amazon.com</option>
                                                    <option value="eBay.com">eBay.com</option>
                                                    <option value="Etsy.com">Etsy.com</option>
                                                    <option value="Walmart.com">Walmart.com</option>
                                                    <option value="Target.com">Target.com</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel'>
                                                <Form.Label className=''>Merchant Token</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Token"
                                                    maxLength={50}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                    {/* VAT Section */}
                    {/* <div className="panels-container ">
                        <div className="panels-item">
                            <div className="panels-title d-flex justify-content-between align-items-center">
                                <h2 className="mb-0"> VAT</h2>
                            </div>
                            <div className="panels-content ">
                                <Form>
                                    <Row className="d-flex gap-1 px-2 py-2 " >
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel'>
                                                <Form.Label>VAT Scheme</Form.Label>
                                                <Form.Control as="select" defaultValue="No Registered" className="custom-panels-select">
                                                    <option value="No.Registered">No Registered</option>
                                                    <option value="Registered">Registered</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                </Form>

                            </div>
                        </div>
                    </div> */}
                    {/* Buying Criteria */}
                    {/* <div className="panels-container ">
                        <div className="panels-item">
                            <div className="panels-title d-flex justify-content-between align-items-center">
                                <h2 className="mb-0"> Buying Criteria</h2>
                            </div>
                            <div className="panels-content ">
                                <Form>
                                    <Row className="d-flex gap-1 px-2 py-2 " >
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Minimum BSR (%)</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="0.00"
                                                    maxLength={50}
                                                />
                                                <button className="percentage-btn">%</button>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Minimum BSR (%)</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="2.00"
                                                    maxLength={50}
                                                />
                                                <button className="percentage-btn">%</button>


                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input dollar-input'>
                                                <Form.Label className=''>Minimum Profit</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="0.00"
                                                    maxLength={50}
                                                />
                                                <button className="dollar-btn">$</button>

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Minimum ROI</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="0.00"
                                                    maxLength={50}
                                                />
                                                <button className="percentage-btn">%</button>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>

                            </div>
                        </div>
                    </div> */}
                    {/* Additional Costs*/}
                    {/* <div className="panels-container ">
                        <div className="panels-item">
                            <div className="panels-title d-flex justify-content-between align-items-center">
                                <h2 className="mb-0">Additional Costs</h2>
                            </div>
                            <div className="panels-content ">
                                <Form>
                                    <Row className="d-flex gap-1 px-2 py-2" >
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input dollar-input'>
                                                <Form.Label className=''>Prep Fee</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="0.00"
                                                    maxLength={50}
                                                />
                                                <button className="dollar-btn">$</button>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input dollar-input'>
                                                <Form.Label className=''>Misc Fee</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="0.00"
                                                    maxLength={50}
                                                />
                                                <button className="dollar-btn">$</button>

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Misc Fee(%)</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="0.00"
                                                    maxLength={50}
                                                />
                                                <button className="percentage-btn">%</button>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input dollar-input'>
                                                <Form.Label className=''>Inbound Shipping</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="0.00"
                                                    maxLength={50}
                                                />
                                                <button className="dollar-btn">$</button>
                                                <button className="storage-btn">Per Pound</button>
                                            </Form.Group>
                                        </Col>

                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel '>
                                                <Form.Label>Inbound Placement (.com only)</Form.Label>
                                                <Form.Control as="select" defaultValue="Amazon.com" className="custom-panels-select">
                                                    <option value="Amazon.com">Amazon Optimized Splits</option>
                                                    <option value="eBay.com">eBay.com</option>
                                                    <option value="Etsy.com">Etsy.com</option>
                                                    <option value="Walmart.com">Walmart.com</option>
                                                    <option value="Target.com">Target.com</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Use Peak Storage Fees</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="No"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch />} label="" className="switch-panels" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Enabled CEP Storage</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div> */}
                    {/* Default Values*/}
                    {/* <div className="panels-container ">
                        <div className="panels-item">
                            <div className="panels-title d-flex justify-content-between align-items-center">
                                <h2 className="mb-0"> Default Values</h2>
                            </div>
                            <div className="panels-content ">
                                <Form>
                                    <Row className="d-flex gap-1 px-2 py-2 " >
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel '>
                                                <Form.Label>Ranks & Prices Time Frame </Form.Label>
                                                <Form.Control as="select" defaultValue="Amazon.com" className="custom-panels-select">
                                                    <option value="Amazon.com">Current</option>
                                                    <option value="eBay.com">Current</option>
                                                    <option value="Etsy.com">Current</option>

                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel '>
                                                <Form.Label>Buy Box Analysis Time Frame </Form.Label>
                                                <Form.Control as="select" defaultValue="Amazon.com" className="custom-panels-select">
                                                    <option value="Amazon.com">90 Days </option>
                                                    <option value="eBay.com">60 Days</option>
                                                    <option value="Etsy.com">30 Days</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input dollar-input'>
                                                <Form.Label className=''>FBM Cost </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="0.00"
                                                    maxLength={50}
                                                />
                                                <button className="dollar-btn">$</button>
                                            </Form.Group>
                                        </Col>

                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Storage Time </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="0"
                                                    maxLength={50}
                                                />
                                                <button className="storage-btn">Months</button>

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Local Fullfillment </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="FBA"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>European Fullfillment </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="EFN"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />

                                            </Form.Group>
                                        </Col>

                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Custom ROI Calc </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="0.00"
                                                    maxLength={50}
                                                />
                                                <button className="percentage-btn">% </button>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div> */}
                    {/* Miscellaneous */}
                    {/* <div className="panels-container ">
                        <div className="panels-item">
                            <div className="panels-title d-flex justify-content-between align-items-center">
                                <h2 className="mb-0"> Miscellaneous</h2>
                            </div>
                            <div className="panels-content ">
                                <Form>
                                    <Row className="d-flex gap-1 px-2 py-2 " >
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Top Offers on Search Results </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input'>
                                                <Form.Label className=''>Keepa on Search Results  </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Store Geo Location  </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Dark Mode (Beta) </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="No"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch />} label="" className="switch-panels" />

                                            </Form.Group>
                                        </Col>

                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div> */}
                    {/*    Quick Info */}
                    {/* <div className="panels-container ">
                        <div className="panels-item">
                            <div className="panels-title d-flex justify-content-between align-items-center">
                                <h2 className="mb-0">Quick Info</h2>
                            </div>
                            <div className="panels-content ">
                                <Form>
                                    <Row className="d-flex gap-1 px-2 py-2 " >
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Show Profit</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Show Profit Margin</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Show ROI </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Show Breakeven </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />

                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Show Offer Summary </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div> */}
                    {/*   Charts */}
                    {/* <div className="panels-container ">
                        <div className="panels-item">
                            <div className="panels-title d-flex justify-content-between align-items-center">
                                <h2 className="mb-0">Charts</h2>
                            </div>
                            <div className="panels-content ">
                                <Form>
                                    <Row className="d-flex gap-1 px-2 py-2 " >
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Show Prices Chart </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Show Sold Chart</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Show Offers Chart </Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder="Yes"
                                                    maxLength={50}
                                                />
                                                <FormControlLabel control={<Switch defaultChecked />} label="" className="switch-panels" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel '>
                                                <Form.Label>Charts Time Span  </Form.Label>
                                                <Form.Control as="select" defaultValue="Amazon.com" className="custom-panels-select">
                                                    <option value="Amazon.com">All Time</option>
                                                    <option value="eBay.com">Current</option>
                                                    <option value="Etsy.com">Current</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div> */}
                    {/*   Tags */}
                    {/* <div className="panels-container d-none">
                        <div className="panels-item">
                            <div className="panels-title d-flex justify-content-between align-items-center">
                                <h2 className="mb-0">Tags</h2>
                            </div>
                            <div className="panels-content ">
                                <Form>
                                    <Row className="d-flex gap-1 px-2 py-2">
                                        <Col lg={12} md={12} xs={12}>
                                            <Form.Group className='form-group-panel btn-input '>
                                                <Form.Label className=''>Add Tag</Form.Label>
                                                <input
                                                    type="text"
                                                    className=' '
                                                    placeholder=""
                                                    maxLength={50}
                                                />
                                                <div className="form-btns-panels">
                                                    <Button buttonText={"New Tag"} buttonColor={"#FBBC31"} buttonWidth="96px" />
                                                </div>
                                                <div className="star-group">
                                                    <div className="star-box">
                                                        <FaStar className="star-icon" />
                                                    </div>
                                                    <button className="star-btn">Sdfsfs</button>
                                                </div>

                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div> */}
                </Col>
                {/* SAS  Panels Section  */}
                <Col>
                    <div className="panels-container ">
                        <div className="panels-item">
                            <div className="panels-title d-flex justify-content-between align-items-center">
                                <h2 className="mb-0"> SAS Panels</h2>
                            </div>
                            <div className="panels-content ">
                                <Form className="sas-panels-form">
                                    <Row className="d-flex gap-1 px-2 py-2  sas-panels" >
                                        <DraggableInputs />
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="d-flex justify-content-end gap-3">
                <Button buttonText={"Save"} buttonColor={"#FBBC31"} borderColor="transparent" buttonWidth="173px" />
                <Button buttonText={"Cancel"} buttonColor={"transparent"} borderColor="#FBBC31" fontColor="#6C6C6C" buttonWidth="173px" />
            </div>
        </section >
    );
};

export default Panels;
