import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import "./index.css";

interface YourComponentProps {
  bannerText: string;
  bannerlink: any;
}

const Banner: React.FC<YourComponentProps> = ({ bannerText, bannerlink }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="pt-2 pb-3 px-0">
      <div className="banner-warning">
        <p className="p-0 m-0">
          {bannerText} <a href="/">{bannerlink}</a>
        </p>
        <IoClose className="close" onClick={handleClose} />
      </div>
    </div>
  );
};

export default Banner;
