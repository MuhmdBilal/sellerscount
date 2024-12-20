import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "./routes";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { logout } from "../Service/services";
import Loader from "../Components/Loader";
import { Logo } from "../utils";

interface SiderbarProps {
  isWidgetScan: any;
  isOpen?: boolean;
}

const Sidebar = ({ isWidgetScan, isOpen }: SiderbarProps) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<any>(false);

  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleLinkClick = (link: any, event: any) => {
    if (link === "*") {
      event.preventDefault();
    }
    if (link === "/widgets") {
      isWidgetScan(true);
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

  useEffect(() => {
    const currentURL = window.location.href;
    const paths = [
      "/overview",
      "/scans",
      "/history",
      "/sheets",
      "/help",
      "/details",
      "/panels",
      "/subscriptions",
      "/integrations",
    ];

    if (paths.some((path) => currentURL.endsWith(path))) {
      isWidgetScan(true);
    }
  }, [isWidgetScan]);

  return (
    <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
      <div>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/">
            <img
              src={Logo}
              alt="Seller Scout Logo"
              width={"192px"}
              height={"21px"}
            />
          </Link>
        </div>
        <ul className="sidebar-list p-0">
          {routes.map((route, index) => (
            <li key={index} className="list-name mx-0 px-0">
              <div className="router-name">
                {route.subCategories ? (
                  <>
                    <div
                      className="d-flex align-items-center text-white route-link justify-content-between"
                      onClick={() => handleDropdownToggle(index)}
                    >
                      <div className="d-flex align-items-center router-menu">
                        <img src={route.icon} alt="icon" />
                        <p className="p-0 m-0 mx-1 icon-items">{route.name}</p>
                      </div>
                      <span className="mx-1">
                        {openDropdownIndex === index ? (
                          <FaChevronUp />
                        ) : (
                          <FaChevronDown />
                        )}
                      </span>
                    </div>

                    {openDropdownIndex === index && (
                      <ul
                        className={`subcategories pl-4 ${
                          openDropdownIndex === index ? "show" : ""
                        }`}
                      >
                        {route.subCategories.map((sub, subIndex) => {
                          const isExternalLink = sub.link.startsWith("http");

                          return (
                            <li key={subIndex} className="list-name py-2 ps-5">
                              {isExternalLink ? (
                                <a
                                  href={sub.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white d-flex align-items-center"
                                >
                                  <p className="p-0 m-0 mx-1 icon-items">
                                    {sub.name}
                                  </p>
                                </a>
                              ) : (
                                <NavLink
                                  to={sub.link}
                                  onClick={(e) => handleLinkClick(sub.link, e)}
                                  className="text-white d-flex align-items-center"
                                >
                                  <p className="p-0 m-0 mx-1 icon-items">
                                    {sub.name}
                                  </p>
                                </NavLink>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={route.link}
                    className="d-block"
                    onClick={(e) => handleLinkClick(route.link, e)}
                  >
                    <div className="d-flex align-items-center text-white route-link">
                      <img src={route.icon} alt="icon" />
                      <p className="p-0 m-0 mx-1 icon-items">{route.name}</p>
                    </div>
                  </NavLink>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="logout-section">
        <button
          onClick={logoutHandler}
          className="d-flex align-items-center gap-2 px-2 text-white"
        >
          <RiLogoutCircleLine className="logout-btn" fontSize={24} />
          <span>Sign Out</span>
        </button>
        {isLoading && (
          <div className="logout-popup">
            <div className="logout-loading">
              <Loader />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
