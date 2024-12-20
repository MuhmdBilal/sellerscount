import ConfirmPassword from "../UserLoginFlow/confirmPassword";
import Login from "../UserLoginFlow/login";
import Register from "../UserLoginFlow/register";
import ResetPassword from "../UserLoginFlow/resetPassword";
import Widgets from "../Components/Widgets";
import DetailsTable from "../Components/DetailsTable";
import Integrations from "../Components/Integrations";
import Panels from "../Components/Panels";
import ParticularItem from "../Components/ParticularItem";
import ProductFolder from "../Components/ProductsFolder";
import MyScan from "../Components/ScanProduct";
import Scans from "../Components/Scans";
import Sheets from "../Components/Sheets";
import Subscription from "../Components/Subscriptions";
import BigCharts from "../Components/Widgets/Partials/bigCharts";
import History from "../Components/History";
import Help from "../Components/Help";
import Instructions from "../Components/Instructions";

/**
 * PublicRoutes is an array of objects that define the routes that do not require authentication.
 * Each object has a path and a component.
 * The component is the root component for the route.
 */
export const PublicRoutes = [
  {
    path: "/",
    component: <Login />,
  },
  {
    path: "/signup",
    component: <Register />,
  },
  {
    path: "/forgot-password",
    component: <ResetPassword />,
  },
  {
    path: "/confirm-password",
    component: <ConfirmPassword />,
  },
];

/**
 * PrivateRoutes is an array of objects that define the routes that require authentication.
 * Each object has a path and a component.
 * The component is wrapped in the DashboardLayout component.
 */
export const getPrivateRoutes = (searchValue: any, setSearchValue: any) => {
  return [
    {
      path: "/overview",
      component: <Widgets searchResult={searchValue} />,
    },
    {
      path: "/panels",
      component: <Panels   />,
    },
    {
      path: "/details",
      component: <DetailsTable />,
    },
    {
      path: "/subscriptions",
      component: <Subscription />,
    },
    {
      path: "/instructions",
      component: <Instructions />,
    },
    {
      path: "/history",
      component: <History />,
    },
    {
      path: "/integrations",
      component: <Integrations />,
    },
    {
      path: "/help",
      component: <Help />,
    },
    {
      path: "/sheets",
      component: <Sheets />,
    },
    {
      path: "/product-folder",
      component: <ProductFolder />,
    },
    {
      path: "/scans",
      component: <Scans/>,
    },
    {
      path: "/widgets",
      component: <Widgets searchResult={searchValue} />,
    },
    {
      path: "/product-details/:id/:code/:time/:file",
      component: <ParticularItem/>,
    },
    {
      path: "/my-scan/:id/:asin/:code/:paramid/",
      component: <MyScan />,
    },
    {
      path: "/view-charts",
      component: <BigCharts />,
    },
  ];
};
