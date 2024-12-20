import React, { useState } from "react";
import { Image } from "react-bootstrap";
import {
  itemScanner,
  filesuploader,
  scanAvailable,
  scanNew,
} from "../../utils";
import "./index.css";
import UploadFile from "../UploadFIle";

interface YourComponentProps {
  totalCount: number;
  getProductUpload: any;
}
const scans = [
  { id: 2, count: 5, src: filesuploader, description: "Files Uploaded" },
  { id: 3, count: 50, src: scanAvailable, description: "Scan Available" },
];

const ScanCards: React.FC<YourComponentProps> = ({
  totalCount,
  getProductUpload,
}) => {
  return (
    <div className="pt-2 pb-3  d-flex flex-column gap-3 flex-md-row justify-content-between row ">
      <div className="scans-feature-card d-flex flex-column justify-content-center align-items-center  col">
        <Image src={scanNew} alt="scan" height={32} width={32}></Image>
        <UploadFile getProductUpload={getProductUpload} />
      </div>
      <div className="scans-card col">
        <div className="d-flex justify-content-between align-items-center">
          <h1>{totalCount}</h1>
          <Image src={itemScanner} alt="scan" height={32} width={32} />
        </div>
        <p>Item Scanned</p>
      </div>
      {scans.map((scan) => (
        <div key={scan.id} className="scans-card col">
          <div className="d-flex justify-content-between align-items-center">
            <h1>{scan.count}</h1>
            <Image src={scan.src} alt="scan" height={32} width={32} />
          </div>
          <p>{scan.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ScanCards;
