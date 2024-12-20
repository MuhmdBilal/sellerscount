import React from "react";
import "./index.css";

interface YourComponentProps {
  buttonText: string;
  buttonColor: string;
  borderColor?: string;
  buttonWidth?: string;
  fontColor?: string;
  fontWeight?: number;
}

const Button: React.FC<YourComponentProps> = ({
  buttonText,
  buttonColor,
  borderColor = buttonColor,
  buttonWidth = "250px",
  fontColor = "#000",
  fontWeight = 600,
}) => {
  return (
    <button
      className="connect-btn"
      style={{
        backgroundColor: buttonColor,
        borderColor: borderColor,
        width: buttonWidth,
        color: fontColor,
        fontWeight: fontWeight,
      }}
    >
      {buttonText}
    </button>
  );
};

export default Button;
