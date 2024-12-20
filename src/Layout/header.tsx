import React, { useState, useEffect, useContext } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/searchContext";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { headerroutes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { IoChevronDown } from "react-icons/io5";
import { User } from "../utils";
import { Tooltip } from "@mui/material";
import { logout } from "../Service/services";

interface HeaderProps {
  onSearch: (searchValue: string) => void;
  isOpen?: boolean;
  toggleSidebar?: any;
}
const Header: React.FunctionComponent<HeaderProps> = ({
  onSearch,
  isOpen,
  toggleSidebar,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  const { searchValue, setSearchValue, setIsGobalFilter, isGobalFilter } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Marketplace",
      children: [
        {
          key: "1-1",
          label: "ER",
        },
        {
          key: "1-2",
          label: "UK",
        },
      ],
    },
    {
      key: "2",
      label: "Condition",
      children: [
        {
          key: "2-1",
          label: "New",
        },
        {
          key: "2-2",
          label: "Used",
        },
      ],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "asin-search-input") {
      setIsGobalFilter(e.target.value);
      setError("");
      setShowTooltip(false);
    }
  };
  const logoutHandler = async () => {
    setIsLoading(true);
    try {
      const response = await logout();
      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userProfile");
        window.location.href = "/";
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    const asinInputId = "asin-search-input";
    if (validateASIN(asinInputId)) {
      const inputValue = (
        document.getElementById(asinInputId) as HTMLInputElement
      ).value;
      navigate(`/overview?asin=${inputValue}`);
      localStorage.setItem("ASINID", inputValue);
      setSearchValue(inputValue);
      onSearch(inputValue);
      setShowTooltip(false);
    } else {
      setShowTooltip(true);
    }
  };
  const params = new URLSearchParams(window.location.search);
  const asinFromUrl = params.get("asin");
  useEffect(() => {
    if (asinFromUrl) {
      if (validateASINString(asinFromUrl)) {
        localStorage.setItem("ASINID", asinFromUrl);
        setSearchValue(asinFromUrl);
        onSearch(asinFromUrl);
        setIsGobalFilter(asinFromUrl);
      } else {
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    } else {
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [asinFromUrl]);

  const validateASINString = (asin: string): boolean => {
    const asinRegex = /^[A-Z0-9]{10}$/;
    return asinRegex.test(asin);
  };
  const validateASIN = (id: string): boolean => {
    const inputElement = document.getElementById(id) as HTMLInputElement;

    if (!inputElement) {
      console.error(`Input element with id "${id}" not found.`);
      return false;
    }

    const inputValue = inputElement.value;

    if (inputValue.startsWith("http://") || inputValue.startsWith("https://")) {
      setError(
        "Search by URL is not implemented yet. We are working on this feature."
      );
      return false;
    }

    const asinRegex = /^[A-Z0-9]{10}$/;
    if (!asinRegex.test(inputValue)) {
      setError("Invalid ASIN. Please enter a 10-character alphanumeric code.");
      return false;
    }

    setError("");
    return true;
  };

  useEffect(() => {
    if (isGobalFilter !== searchValue) {
      setIsGobalFilter(searchValue);
    }
  }, [searchValue]);

  return (
    <>
      <div
        className={`header d-flex justify-content-between align-items-center ${
          isOpen ? "open" : "collapsed"
        }`}
      >
        {isOpen ? (
          <div className="toggle-sidebar">
            <IoIosArrowBack
              onClick={() => toggleSidebar(false)}
              className="toggle toggle-arrow"
            />
          </div>
        ) : (
          <div className="toggle-sidebar">
            <IoIosArrowForward
              onClick={() => toggleSidebar(true)}
              className="toggle toggle-arrow left-arrow-sidebar"
            />
          </div>
        )}
        <div>
          <Tooltip
            title={error}
            open={showTooltip}
            placement="bottom"
            onClose={() => setShowTooltip(false)}
          >
            <div className="input-search relative input-search-desktop">
              <div className="search-icon-main">
                <SearchIcon onClick={handleSearch} className="search-icon" />
              </div>
              <input
                id="asin-search-input"
                className="input-search-field"
                placeholder="Search ASIN"
                value={isGobalFilter}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                onChange={handleInputChange}
              />
              <Dropdown menu={{ items: [] }} className="sub-drop">
                <span>
                  <Space>US-Used</Space>
                  <DownOutlined />
                </span>
              </Dropdown>
            </div>
          </Tooltip>
        </div>

        {!isOpen && (
          <div className="input-search relative input-search-mobile">
            <div className="search-icon-main">
              <SearchIcon onClick={handleSearch} className="search-icon" />
            </div>
            <input
              id="asin-search-input"
              className="input-search-field"
              placeholder="Search ASIN"
              value={isGobalFilter}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              onChange={handleInputChange}
            />
            <Dropdown menu={{ items }} className="sub-drop">
              <span onClick={(e) => e.preventDefault()}>
                <Space>US-Used</Space>
                <DownOutlined />
              </span>
            </Dropdown>
          </div>
        )}
        <div className="d-flex gap-5 header-navbar">
          {!isOpen &&
            headerroutes.map((route, index) => (
              <div key={index}>
                <NavLink
                  to={route.link}
                  className={({ isActive }) =>
                    `middle-nav ${isActive ? "active" : ""}`
                  }
                >
                  {route.name}
                </NavLink>
              </div>
            ))}
        </div>

        <div className="user-settings-right d-flex align-items-center gap-3">
          <div className="user-profile d-flex align-items-center gap-2">
            <div className="user-image">
              <img src={User} alt="User" />
            </div>
            <div className="user-info">
              <h2>Elam David</h2>
              <p className="mb-0">Member</p>
            </div>
          </div>
          {!isOpen && (
            <div className="dropdown header-dropdown">
              <button
                className="profile-btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <IoChevronDown />
              </button>
              <ul className="dropdown-menu px-1">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/panels")}
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/subscriptions")}
                  >
                    Subscriptions
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/integrations")}
                  >
                    Integration
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={logoutHandler}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {isLoading && (
        <div className="logout-popup">
          <div className="logout-loading">
            <Loader />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
