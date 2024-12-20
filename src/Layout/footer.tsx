import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <p className="mb-0">
        <span>(Seller Scout Design) </span>- all rights reserved to
        <span>
          <a
            href="https://novatoresols.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Novatore Solutions
          </a>
        </span>
        {currentYear}
      </p>
    </div>
  );
};

export default Footer;
