import { ca, com, de, es, fr, it, uk } from "../utils";

export const sellerCentral = [
  { type: "icon", icon: "TiHome" },
  {
    type: "text",
    title: "Add Product",
    link: "https://google.com",
    target: "_blank",
  },
  {
    type: "text",
    title: "Inventory",
    link: "https://google.com",
    target: "_blank",
  },
  {
    type: "text",
    title: "Orders",
    link: "https://google.com",
    target: "_blank",
  },
];

export const lookuptext = [
  {
    type: "text",
    title: "Load More",
    link: "https://google.com",
    target: "_blank",
  },
];
export const heading = ["seller", "stock", "price", "profit", "roi"];

export const dropdownItems = [
  { id: 1, label: "Seller" },
  { id: 2, label: "Avg.price" },
  { id: 3, label: "Won" },
  { id: 4, label: "Last won" },
  { id: 5, label: "Stock" },
  { id: 6, label: "Type" },
];

export const dropdownItems2 = [
  { id: 1, label: "asin" },
  { id: 2, label: "color" },
  { id: 3, label: "isReviewsLoaded" },
  { id: 4, label: "salesRank" },
  { id: 5, label: "size" },
  { id: 6, label: "style" },
];
export const marketplaceheading = ["Rank", "Price", "Profit", "ROI"];

export const variationsHeading = ["Style", "Size"];

export const analysisheading = ["Seller", "Avg.price", "Won", "Last won"];

export const roiheading = ["R.O.I.", "Profit", "Sale Price"];

export const lookupheading = ["History", "Source", "Cost", "Sale"];

export const valuesKeepa = ["7", "30", "90", "180", "365", "730"];

export const valuesPieChart = ["30", "90", "180", "All"];

export const lookupdata = [
  {
    History: "May ",
    Source: "Not ",
    Cost: "$100.0",
    Sale: "$241.4",
  },
  {
    History: "May ",
    Source: "Not ",
    Cost: "$100.0",
    Sale: "$241.4",
  },
  {
    History: "May ",
    Source: "Not ",
    Cost: "$100.0",
    Sale: "$241.4",
  },
  {
    History: "May ",
    Source: "Not ",
    Cost: "$100.0",
    Sale: "$241.4",
  },
  {
    History: "May ",
    Source: "Not ",
    Cost: "$100.0",
    Sale: "$241.4",
  },
];

export const roidata = [
  {
    "R.O.I.": "1%",
    Profit: "10%",
    "Sale Price": "$100",
  },
  {
    "R.O.I.": "1%",
    Profit: "10%",
    "Sale Price": "$100",
  },
  {
    "R.O.I.": "1%",
    Profit: "10%",
    "Sale Price": "$100",
  },
  {
    "R.O.I.": "1%",
    Profit: "10%",
    "Sale Price": "$100",
  },
  {
    "R.O.I.": "1%",
    Profit: "10%",
    "Sale Price": "$100",
  },
];

export const flagImages = [
  {
    src: uk,
    key: "UK",
  },
  {
    src: fr,
    key: "FR",
  },
  {
    src: de,
    key: "DE",
  },
  {
    src: es,
    key: "SP",
  },
  {
    src: it,
    key: "IT",
  },
  {
    src: com,
    key: "US",
  },
  {
    src: ca,
    key: "CA",
  },
];

export const marketimages = [
  {
    src: uk,
    Rank: "A one",
    Price: "10%",
    Profit: "100",
    ROI: "--",
  },
  {
    src: fr,
    Rank: "A one",
    Price: "10%",
    Profit: "100",
    ROI: "--",
  },
  {
    src: de,
    Rank: "A one",
    Price: "10%",
    Profit: "100",
    ROI: "--",
  },
  {
    src: es,
    Rank: "A one",
    Price: "10%",
    Profit: "100",
    ROI: "--",
  },
  {
    src: it,
    Rank: "A one",
    Price: "10%",
    Profit: "100",
    ROI: "--",
  },
];

export const notesButton = [
  { type: "icon", icon: "FaTag" },
  {
    type: "button",
    title: "Add note",
  },
];

export const buyBoxAnalysis = [
  {
    seller: "Amazon.com",
    avgPrice: "$293.37",
    won: "99%",
    lastWon: "2024-05-31T04:48:00Z",
    stock: "7",
    type: "Retail",
    currentRatingCount: 2510,
    currentRating: 4.5,
  },
  {
    seller: "Mookie's Footwear",
    avgPrice: "$287.98",
    won: "<1%",
    lastWon: "2024-05-21T04:48:00Z",
    stock: "5",
    type: "Supplements",
    currentRatingCount: 510,
    currentRating: 3.3,
  },
  {
    seller: "Small Town ",
    avgPrice: "$249.84",
    won: "<1%",
    lastWon: "2024-03-02T04:48:00Z",
    stock: "3",
    type: "Footwear",
  },
];

export const buyBoxColumns = [
  {
    Header: "Seller",
    accessor: "seller",
  },
  {
    Header: "Avg. price",
    accessor: "avgPrice",
  },
  {
    Header: "Won",
    accessor: "won",
  },
  {
    Header: "Last won",
    accessor: "lastWon",
  },
  {
    Header: "Stock",
    accessor: "stock",
    width: "20%",
  },
  {
    Header: "Type",
    accessor: "type",
  },
];

export const variationsColumns = [
  {
    Header: "Asin",
    accessor: "asin",
  },
  {
    Header: "Color",
    accessor: "color",
  },
  {
    Header: "Size",
    accessor: "size",
  },
  {
    Header: "Style",
    accessor: "style",
  },
  {
    Header: "Sales Rank",
    accessor: "salesRank",
  },
];


export const countryCodes = [
  {
    CountryCode: "US",
    CountryName: "US",
    MarketPlaceId: "ATVPDKIKX0DER",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" // US flag URL
  },
  {
    CountryCode: "MX",
    CountryName: "Mexico",
    MarketPlaceId: "A1AM78C64UM0Y8",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg" // Mexico flag URL
  },
  {
    CountryCode: "UK",
    CountryName: "UK",
    MarketPlaceId: "A1F83G8C2ARO7P",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_Kingdom.svg" // UK flag URL
  },
  {
    CountryCode: "CA",
    CountryName: "Canada",
    MarketPlaceId: "A2EUQ1WTGCTBG2",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg" // Canada flag URL
  },
  {
    CountryCode: "IT",
    CountryName: "Italy",
    MarketPlaceId: "APJ6JRA9NG5V4",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg" // Italy flag URL
  },
  {
    CountryCode: "NL",
    CountryName: "Netherlands",
    MarketPlaceId: "A1805IZSGTT6HS",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg" // Netherlands flag URL
  },
  {
    CountryCode: "DE",
    CountryName: "Germany",
    MarketPlaceId: "A1PA6795UKMFR9",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg" // Germany flag URL
  },
  {
    CountryCode: "FR",
    CountryName: "France",
    MarketPlaceId: "A13V1IB3VIYZZH",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg" // France flag URL
  },
  {
    CountryCode: "SE",
    CountryName: "Sweden",
    MarketPlaceId: "A2NODRKZP88ZB9",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg" // Sweden flag URL
  },
  {
    CountryCode: "SP",
    CountryName: "Spain",
    MarketPlaceId: "A1RKKUPIHCS9HS",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg" // Spain flag URL
  },
  {
    CountryCode: "PL",
    CountryName: "Poland",
    MarketPlaceId: "A1C3SOZRARQ6R3",
    CountryIcon: "https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg" // Poland flag URL
  }
];
