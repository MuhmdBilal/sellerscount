import React, { useContext, useEffect } from "react";
import Main from "./Layout/main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SearchContext } from "./context/searchContext";
import { getPrivateRoutes, PublicRoutes } from "./routes";
import { RouteConfig } from "./routes/interface";
const accessToken = localStorage.getItem("accessToken");
function App() {
  const { searchValue, setSearchValue } =
    useContext(SearchContext) ??
    (() => {
      throw new Error(
        "SearchContext is undefined. Ensure the component is within SearchState."
      );
    })();

  const handleSearch = (searchTerm: any) => {
    setSearchValue(searchTerm);
  };

  useEffect(() => {
    const pathname = window.location.pathname;
    if (
      pathname != "/" &&
      pathname != "/signup" &&
      pathname != "/forgot-password" &&
      pathname != "/confirm-password"
    ) {
      if (!accessToken) {
        window.location.href = "/";
      }
    }
  }, []);

  const PrivateRoutes = getPrivateRoutes(searchValue, setSearchValue);
  return (
    <Router>
      <Routes>
        {!accessToken ? (
          PublicRoutes.map(
            ({ component, path }: RouteConfig, index: number) => (
              <Route key={index} path={path} element={component} />
            )
          )
        ) : (
          <Route
            path="/"
            element={
              <React.Fragment>
                <Main />
              </React.Fragment>
            }
          >
            {PrivateRoutes.map(
              ({ component, path }: RouteConfig, index: number) => (
                <Route key={index} path={path} element={component} />
              )
            )}
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
