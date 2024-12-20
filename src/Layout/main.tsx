import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Contact from "../Components/Contact";
import Header from "./header";
import { SearchContext } from "../context/searchContext";
import "./layout.css";
import "../App.css";
import Footer from "./footer";

const Main: React.FunctionComponent = () => {
  const [isOpen, setSidebarCollapsed] = useState<boolean>(true);
  const [isWidgetScan, setisWidgetScan] = useState<any>(false);
  const { setSearchValue } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();

  const handleSearch = (searchTerm: any) => {
    localStorage.setItem("ASINID", searchTerm)
    setSearchValue(searchTerm);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!isOpen);
  };

  useEffect(() => {
    if (isWidgetScan) {
      setSidebarCollapsed(false);
    }
    setTimeout(() => {
      setisWidgetScan(false)
    }, 100);
  }, [isWidgetScan]);
  return (
    <div className="app-container">
      <div className={`main-layout ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header onSearch={handleSearch} toggleSidebar={toggleSidebar} isOpen={isOpen} />
        <Sidebar isWidgetScan={setisWidgetScan} isOpen={isOpen} />
      </div>
      <div className={`outlet-layout ${isOpen ? "shifted" : ""}`}>
        <Outlet />
      </div>
      <div className="contact-query">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
