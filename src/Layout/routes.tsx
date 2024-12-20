import { RouteFive, RouteFour, RouteOne, RouteThree, RouteTwo, scan } from "../utils";

export const routes = [
  {
    icon: RouteOne,
    name: "Overview",
    link: "/overview",
  },
  // {
  //   icon: RouteTwo,
  //   name: "Sheets",
  //   link: "/sheets",
  // },
  {
    icon: scan,
    name: "Scans",
    link: "/scans",
  },
  {
    icon: RouteThree,
    name: "History",
    link: "/history",
  },

  // {
  //   icon: RouteFour,
  //   name: "Widgets Scans",
  //   link: "/widgets",
  // },
  // {
  //   icon: RouteThree,
  //   name: "Favourites",
  //   link: "/product-folder",
  // },
  {
    icon: RouteFour,
    name: "Help",
    link: "",
    subCategories: [
      { name: "Install Apps", link: "/help", },
      // { name: "Facebook Group", link: "https://www.facebook.com/groups/sellerampbeta/", },
      { name: "Youtube", link: "https://www.youtube.com/channel/UCqAArMMS5T6fbVjIvKAaiVw", },
      // { name: "Sales Rank Table", link: "/instructions", },
      { name: "Sales Rank Table", link: "/details", },
    ],
  },
  {
    icon: RouteFive,
    name: "My Account",
    link: "#",
    subCategories: [
      // { name: "Settings", link: "/panels" },
      { name: "Subscriptions", link: "/subscriptions" },
      // { name: "Integration", link: "/integrations" },
    ],
  },
  // {
  //   icon: RouteFive,
  //   name: "Setting",
  //   link: "/setting",
  // },
];

export const headerroutes = [
  {
    icon: RouteOne,
    name: "Overview",
    link: "/overview",
  },
  // {
  //   icon: RouteTwo,
  //   name: "Sheets",
  //   link: "/sheets",
  // },
  {
    icon: RouteTwo,
    name: "Scans",
    link: "/scans",
  },
  {
    icon: RouteThree,
    name: "History",
    link: "/history",
  },
  {
    icon: RouteFour,
    name: "Help",
    link: "/help",
    subCategories: [
      { name: "Install Apps", link: "/help", },
      { name: "Youtube", link: "https://www.youtube.com/channel/UCqAArMMS5T6fbVjIvKAaiVw", },
      { name: "Sales Rank Table", link: "/details", },
    ],
  },


];