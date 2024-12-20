import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaAmazon,
  FaBalanceScale,
  FaBell,
  FaChartLine,
  FaChartPie,
  FaHashtag,
  FaPercentage,
  FaPlusCircle,
  FaRegEye,
  FaShoppingCart,
  FaTag,
} from "react-icons/fa";
import { FaBoltLightning, FaLocationDot } from "react-icons/fa6";
import { HiCalculator } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import { PiSquaresFourFill } from "react-icons/pi";
import { notesButton, roidata } from "../../constants";
import {
  formatElapsedTime,
  handleOfferValues,
  handleRoiValues,
  handleSaleValue,
  handleValues,
} from "../../helpers";
import {
  getAlerts,
  getBuyBoxAnalysis,
  getCharts,
  getKeepa,
  getNotes,
  getProductInfo,
  getProductVariations,
  getRanksAndPrices,
  getSellerOffers,
  profitCalculate,
} from "../../Service/services";
import Loader from "../Loader";
import "./index.css";
import Alerts from "./Partials/alerts";
import Analysis from "./Partials/analysis";
import { useNavigate } from "react-router-dom";
import Charts from "./Partials/charts";
import Discounts from "./Partials/discounts";
import Ebay from "./Partials/ebay";
import Keepa from "./Partials/keepa";
import Marketplace from "./Partials/marketplace";
import Notes from "./Partials/notes";
import Offers from "./Partials/offers";
import Product from "./Partials/product";
import ProfitCalculator from "./Partials/profitCalculator";
import QuickInfo from "./Partials/quickInfo";
import RanksAndPrices from "./Partials/ranksAndPrices";
import Roi from "./Partials/roi";
import SearchAgain from "./Partials/searchAgain";
import SellerCentral from "./Partials/sellerCentral";
import Variations from "./Partials/variations";
import VatSettings from "./Partials/vatSettings";
import Widget from "./widget";
import { TiWorld } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import Banner from "../Banner";
import { Spinner } from "react-bootstrap";
type DropdownState = {
  productDetails: boolean;
  quickInfo: boolean;
  profitCalculator: boolean;
  offers: boolean;
  ranks: boolean;
  sellerCentral: boolean;
  eBay: boolean;
  search: boolean;
  notesTags: boolean;
  geolocation: boolean;
  vatSettings: boolean;
  discounts: boolean;
  europeanMarketPlaces: boolean;
  roi: boolean;
  lookupDetails: boolean;
  alerts: boolean;
  keepa: boolean;
  variationBeta: boolean;
  buyBoxAnalysis: boolean;
  charts: boolean;
};
interface resultprops {
  searchResult: string;
}
interface ProfitCalculator {
  costPrice?: number;
  salePrice?: number;
  totalFees?: any;
  FBMCost?: any;
}

interface ProductDetails {
  profitCalculator?: ProfitCalculator;
  quickInfo?: any;
}
interface CSVData {
  date: Date;
  price: number;
}
const Widgets = ({ searchResult }: resultprops) => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<any>({});
  const [roi, setRoi] = useState<any>([]);
  const [roiData, setRoiData] = useState<any>([]);
  const [ebay, setEbay] = useState<any>([]);
  const [productDetails, setProductDetails] = useState<any>({});
  const [estimates, setEstimates] = useState<any>(null);
  const [fulFillmentType, setFulFillmentType] = useState<any>(0);
  const [offersFilter, setOffersFilter] = useState<any>({});
  const [buyBoxAnalysis, setBuyBoxAnalysis] = useState([]);
  const [productVariation, setProductVariation] = useState<any>([]);
  const [selectedDay, setSelectedDay] = useState<any>("30");
  const [processedData, setProcessedData] = useState<any>({});
  const [orignalData, setOrignalDate] = useState<any>({});
  const [dropdownStates, setDropdownStates] = useState({
    productDetails: false,
    quickInfo: false,
    profitCalculator: false,
    offers: false,
    ranks: false,
    sellerCentral: false,
    eBay: false,
    search: false,
    notesTags: false,
    geolocation: false,
    vatSettings: false,
    discounts: false,
    europeanMarketPlaces: false,
    roi: false,
    lookupDetails: false,
    alerts: false,
    keepa: false,
    variationBeta: false,
    buyBoxAnalysis: false,
    charts: false,
  });
  const [loading, setLoading] = useState(true);
  const [ranksAndPrices, setRanksAndPrices] = useState<any>({});
  const [ranksLoader, setRanksLoader] = useState(false);
  const [sellerCentral, setSellerCentral] = useState<any>([]);
  const [alerts, setAlerts] = useState<any>([]);
  const [variations, setVariations] = useState<any>([]);
  const [notes, setAllNotes] = useState<any>([]);
  const [buyBoxLoader, setBuyBoxLoader] = useState(false);
  const [chartsData, setChartsData] = useState<any>([]);
  const [keepa, setKeepa] = useState<any>("");
  const [rankFilter, setRankFilter] = useState(0);
  const [chartsFilter, setChartsFilter] = useState(0);
  const [chartsLoader, setChartsLoader] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>("US");
  const [discounts, setDiscounts] = useState<any>([]);
  const [buyBoxFilter, setBuyBoxFilter] = useState(30);
  const [totalDiscount, setTotalDiscount] = useState<any>("");
  const [keepaLoader, setKeepaLoader] = useState(false);
  const [referralFeePercentage, setReferralFeePercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [calculateNetPrice, setCalculateNetPrice] = useState<any>();
  const [columns, setColumns] = useState<any>([]);
  const [isStorageFee, setIsStorageFee] = useState<any>(0);
  const [variationLoadings, setVariationLoadings] = useState<any>(false);
  const getProductDetails = async () => {
    try {
      setLoading(true);
      setRankFilter(0);
      const response = await getProductInfo(searchResult);
      if (response) {
        const salesValue = handleSaleValue(response?.data, "quickInfo");
        const updatedValue = handleValues(salesValue, "quickInfo", 0);
        setProductDetails(updatedValue);
        setLoading(false);
        setIsLoading(false);
        setDropdownStates((prevState) => ({
          ...prevState,
          productDetails: true,
          quickInfo: true,
          profitCalculator: true,
          offers: true,
          ranks: true,
          sellerCentral: true,
          eBay: true,
          search: true,
          notesTags: true,
          geolocation: true,
          vatSettings: true,
          discounts: true,
          europeanMarketPlaces: true,
          roi: true,
          lookupDetails: true,
          alerts: true,
          keepa: true,
          variations: true,
          buyBoxAnalysis: true,
          charts: true,
        }));
        setEbay([
          {
            type: "text",
            title: "Search eBay",
            link: response?.data?.eBay?.searchEBay,
            target: "_blank",
          },
          {
            type: "text",
            title: "Sold on eBay",
            link: response?.data?.eBay?.soldOnEBay,
            target: "_blank",
          },
        ]);

        setSellerCentral([
          {
            type: "icon",
            icon: "TiHome",
            link: response?.data?.sellerCentral?.home,
            target: "_blank",
          },
          {
            type: "text",
            title: "Add Product",
            link: response?.data?.sellerCentral?.addProduct,
            target: "_blank",
          },
          {
            type: "text",
            title: "Inventory",
            link: response?.data?.sellerCentral?.inventory,
            target: "_blank",
          },
          {
            type: "text",
            title: "Orders",
            link: response?.data?.sellerCentral?.orders,
            target: "_blank",
          },
        ]);

        const discountData = response?.data?.discounts?.map((item: any) => ({
          type: "text",
          title: item,
        }));
        setDiscounts(discountData);

        const dependentApiCalls = [
          getRanks(),
          getAllNotes(),
          getProductVariation(),
          getOffers(
            response?.data,
            false,
            false,
            updatedValue?.quickInfo?.costPrice
          ),
          getRanks(),
          calculateProfitFirst(updatedValue, "quickInfo"),
          getAllNotes(),
          getAllAlerts(),
          getKeepaValue(),
          getChartsData(),
        ];

        if (searchResult && buyBoxFilter) {
          dependentApiCalls.unshift(getBuyBox());
        }
        const results = await Promise.allSettled(dependentApiCalls);
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(`API Call ${index + 1} failed:`, result.reason);
            toast.error(result.reason);
          }
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.ErrorMessage);
      setLoading(false);
      setIsLoading(false);
    }
  };


  const getRanks = async () => {
    try {
      setRanksLoader(true);
      const response = await getRanksAndPrices(searchResult, rankFilter);
      const calculateValue =
        response?.data.netBuyBoxPriceChanges?.increased -
        response?.data.netBuyBoxPriceChanges?.decreased;
      if (response) {
        setRanksAndPrices(response?.data);
        setCalculateNetPrice(calculateValue);
      }
      if (response.status === 401) {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.title);
    } finally {
      setRanksLoader(false);
    }
  };

  const getOffers = async (
    productData: any,
    prime: any,
    live: any,
    cost: any
  ) => {
    try {
      // setIsLoading(true)
      setOffersFilter({
        prime: prime === "true" ? true : false,
        live,
      });
      const response = await getSellerOffers(searchResult, prime, live, cost);
      if (response) {
        setOffers(response?.data);
        return response?.data;
      }
    } catch (error: any) {
      console.log(
        error?.response?.data?.ErrorMessage ?? error?.response?.data?.title
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getKeepaValue = async () => {
    setKeepaLoader(true);
    try {
      const response = await getKeepa(
        searchResult,
        selectedCountry,
        selectedDay
      );
      if (response) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = URL.createObjectURL(blob);
        setKeepa(url);
      }
      if (response.status === 401) {
        navigate("/");
      }
    } catch (error: any) {
      // console.error(
      //   error?.response?.data?.ErrorMessage ?? error?.response?.data?.title
      // );
    } finally {
      setKeepaLoader(false);
    }
  };
  const getBuyBox = async () => {
    try {
      setBuyBoxLoader(true);
      const response = await getBuyBoxAnalysis(searchResult, buyBoxFilter);
      if (response) {
        const transformedData = response?.data?.map((item: any) => {
          const currentTime = new Date().getTime();
          const lastWonTime = new Date(item?.data?.lastWon).getTime();
          const elapsedTime = currentTime - lastWonTime;
          return {
            seller: item.sellerName,
            avgPrice: "$" + (item.data.avePrice / 100).toFixed(2),
            won: item?.data?.wonPercentage,

            lastWon: formatElapsedTime(elapsedTime),
            stock: item.data.stock,
            type: item.data.type,
            currentRatingCount: item.currentRatingCount,
            currentRating: item.currentRating,
          };
        });

        setBuyBoxAnalysis(transformedData);
      }
    } catch (error: any) {
      setBuyBoxLoader(false);
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await getNotes(searchResult);
      if (response) {
        setAllNotes(response?.data);
      }
      if (response.status === 401) {
        navigate("/");
      }
    } catch (error: any) {
      console.error(
        error?.response?.data?.ErrorMessage ?? error?.response?.data?.title
      );
    }
  };

  // const saveNotes = async () => {
  //   try {
  //     const response = await saveNote({ asin: searchResult, note });
  //     if (response) {
  //       setAllNotes(response?.data);
  //     }
  //     if (response.status === 401) {
  //       navigate("/");
  //     }
  //   } catch (error: any) {
  //     console.error(
  //       error?.response?.data?.ErrorMessage ?? error?.response?.data?.title
  //     );
  //   }
  // };

  const getChartsData = async () => {
    try {
      setChartsLoader(true);
      const response = await getCharts(searchResult, chartsFilter);
      if (response) {
        setChartsData(response?.data);
      }
      if (response.status === 401) {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.ErrorMessage);
    } finally {
      setChartsLoader(false);
    }
  };

  const getAllAlerts = async () => {
    try {
      const response = await getAlerts(searchResult);
      if (response) {
        setAlerts(response?.data);
      }
      if (response.status === 401) {
        navigate("/");
      }
    } catch (error: any) {
      console.error(
        error?.response?.data?.ErrorMessage ?? error?.response?.data?.title
      );
    }
  };

  const getRoi = async () => {
    try {
      const response = await profitCalculate(searchResult);
      if (response) {
        setRoiData(response?.data?.roiDto);
      } else {
        console.warn("Response does not contain ROI data.");
      }
    } catch (error: any) {
      console.error(
        error?.response?.data?.ErrorMessage ??
        error?.response?.data?.title ??
        "An unexpected error occurred."
      );
    }
  };

  const getProductVariation = async () => {
    try {
      setProductVariation([])
      setColumns([])
      setVariations([])
      setVariationLoadings(true)
      const response = await getProductVariations(searchResult);
      if (response) {
        const dynamicColumns = Object.keys(response?.data?.productVariations[0]).map((key) => {
          const formattedHeader = formatHeader(key);
          return {
            Header: formattedHeader,
            accessor: key,
            id: key,
          };
        });
        setColumns(dynamicColumns);
        setProductVariation(response?.data);
        setVariations(response?.data?.productVariations || []);
      }
      if (response.status === 401) {
        navigate("/");
      }
    } catch (error: any) {
      console.error(
        error?.response?.data?.ErrorMessage ?? error?.response?.data?.title
      );
    }finally{
      setVariationLoadings(false)
    }
  };
  const formatHeader = (key: string) => {
    const formattedKey = key
      .replace(/name$/i, "")
      .replace(/type$/i, "");

    const formatted = formattedKey
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .replace(/_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return formatted;
  };
  const calculateProfitFirst = async (
    updatedValues?: ProductDetails,
    type?: string,
    saleType?: any
  ) => {
    const getCostAndPrice = (values: ProductDetails | undefined, type: any) => {
      return {
        cost: values?.profitCalculator?.costPrice ?? 0,
        price:
          type === "quickInfo"
            ? values?.quickInfo?.salePrice
            : values?.profitCalculator?.salePrice,
        fbmCost: values?.profitCalculator?.FBMCost ?? 0,
      };
    };

    const data =
      fulFillmentType === 0
        ? {
          asin: searchResult,
          ...getCostAndPrice(updatedValues || productDetails, type),
          fulfillmentMethod: fulFillmentType,
          StorageMonths: isStorageFee
        }
        : {
          asin: searchResult,
          ...getCostAndPrice(updatedValues || productDetails, type),
          fulfillmentMethod: fulFillmentType,
          fbmCost:
            updatedValues?.profitCalculator?.FBMCost ??
            productDetails?.profitCalculator?.FBMCost ??
            0,
          StorageMonths: isStorageFee
        };
    // if (!productDetails?.profitCalculator) {
    //   console.error("Product details are missing profitCalculator data.");
    //   return;
    // }
    
    try {
      if(searchResult){
        // setIsLoading(true);
      const response = await profitCalculate(data);
      if (response?.status === 200) {
        setRoiData(response?.data?.roiData);
        let productValues: ProductDetails = updatedValues
          ? { ...updatedValues }
          : { ...productDetails };

        setReferralFeePercentage(response.data?.referralFeePercentage);
        productValues.profitCalculator = productValues.profitCalculator || {};
        if (response.data?.totalFees) {
          if (fulFillmentType === 1) {
            productValues.profitCalculator.totalFees = {
              ...response.data.totalFees,
              fulfilment_FBM: response.data.totalFees.fulfilment_FBA,
            };
            delete productValues.profitCalculator.totalFees.fulfilment_FBA;
          } else {
            productValues.profitCalculator.totalFees = response.data.totalFees;
          }
        }
        const salesValue = handleSaleValue(productValues, "quickInfo");
        const updatedValue = handleValues(salesValue, type, totalDiscount);
        setEstimates(response.data.estimatedPayout);
        setProductDetails(updatedValue);

        if (!saleType) {
          const offerValues = await handleOfferValues(
            offers,
            productValues,
            type
          );
          setOffers(offerValues);
          const roiValues = handleRoiValues(roi, productValues, type);
          setRoi(roiValues);
        }
      }
      }
    } catch (err) {
      console.error("Error calculating profit:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const calculateProfit = async (
    updatedValues?: ProductDetails,
    type?: string,
    saleType?: any
  ) => {
    const getCostAndPrice = (values: ProductDetails | undefined, type: any) => {
      return {
        cost: values?.profitCalculator?.costPrice ?? 0,
        price:
          type === "quickInfo"
            ? values?.quickInfo?.salePrice
            : values?.profitCalculator?.salePrice,
        fbmCost: values?.profitCalculator?.FBMCost ?? 0,
      };
    };

    const data =
      fulFillmentType === 0
        ? {
          asin: searchResult,
          ...getCostAndPrice(updatedValues || productDetails, type),
          fulfillmentMethod: fulFillmentType,
          StorageMonths: isStorageFee
        }
        : {
          asin: searchResult,
          ...getCostAndPrice(updatedValues || productDetails, type),
          fulfillmentMethod: fulFillmentType,
          fbmCost:
            updatedValues?.profitCalculator?.FBMCost ??
            productDetails?.profitCalculator?.FBMCost ??
            0,
          StorageMonths: isStorageFee
        };
    // if (!productDetails?.profitCalculator) {
    //   console.error("Product details are missing profitCalculator data.");
    //   return;
    // }
    
    try {
      if(searchResult){
        setIsLoading(true);
      const response = await profitCalculate(data);
      if (response?.status === 200) {
        setRoiData(response?.data?.roiData);
        let productValues: ProductDetails = updatedValues
          ? { ...updatedValues }
          : { ...productDetails };

        setReferralFeePercentage(response.data?.referralFeePercentage);
        productValues.profitCalculator = productValues.profitCalculator || {};
        if (response.data?.totalFees) {
          if (fulFillmentType === 1) {
            productValues.profitCalculator.totalFees = {
              ...response.data.totalFees,
              fulfilment_FBM: response.data.totalFees.fulfilment_FBA,
            };
            delete productValues.profitCalculator.totalFees.fulfilment_FBA;
          } else {
            productValues.profitCalculator.totalFees = response.data.totalFees;
          }
        }
        const salesValue = handleSaleValue(productValues, "quickInfo");
        const updatedValue = handleValues(salesValue, type, totalDiscount);
        setEstimates(response.data.estimatedPayout);
        setProductDetails(updatedValue);

        if (!saleType) {
          const offerValues = await handleOfferValues(
            offers,
            productValues,
            type
          );
          setOffers(offerValues);
          const roiValues = handleRoiValues(roi, productValues, type);
          setRoi(roiValues);
        }
      }
      }
    } catch (err) {
      console.error("Error calculating profit:", err);
    } finally {
      setIsLoading(false);
    }
  };
 

  const handleToggle = (dropDownName: keyof DropdownState) => {
    setDropdownStates((prevState: DropdownState) => ({
      ...prevState,
      [dropDownName]: !prevState[dropDownName],
    }));
  };

  useEffect(() => {
    if (searchResult && rankFilter >= 0) getRanks();
  }, [rankFilter]);

  // useEffect(() => {
  //   if (searchResult) getChartsData();
  // }, [chartsFilter]);
  useEffect(() => {
    if (searchResult) {
      getProductDetails();
    } else if (!searchResult) {
      setLoading(false)
    }
  }, [searchResult]);

  useEffect(() => {
    if (fulFillmentType == 0 || fulFillmentType == 1) {
      calculateProfit(productDetails, "quickInfo");
    }
  }, [fulFillmentType, isStorageFee]);

  useEffect(() => {
    if (searchResult && (selectedCountry || selectedDay)) getKeepaValue();
  }, [selectedCountry, selectedDay]);

  useEffect(() => {
    if (searchResult && buyBoxFilter) getBuyBox();
  }, [buyBoxFilter]);

  const processCSVData = (
    csvData: number[],
    type?: any,
    key?: any
  ): CSVData[] => {
    if (!csvData || csvData.length === 0) {
      return [];
    }
    const keepaMinutesToDate = (keepaMinutes: number): Date => {
      const epochTime = (keepaMinutes + 21564000) * 60000;
      return new Date(epochTime);
    };

    const testData: CSVData[] = [];
    let date: any, price: number;
    for (let i = 0; i < csvData?.length;) {
      const date = keepaMinutesToDate(csvData[i]);
      const price = (() => {
        if (type === "rating") {
          return csvData[i + 1] / 10;
        } else if (type === "ReviewCount") {
          return csvData[i + 1];
        } else if (type) {
          return csvData[i + 1];
        } else {
          return csvData[i + 1] / 100;
        }
      })();

      const year = new Date(date).getFullYear();
      if (price > 0) {
        testData.push({ date, price });
      }
      key !== "buyBoxData" ? (i += 2) : (i += 3);
    }
    return testData;
  };
  const keepaTimeToUnixDateTime = (keepaMinutes: number): number => {
    return (keepaMinutes + 21564000) * 60000;
  };

  const transformKeepaCsv = (keepaCsv: any[], key: string): any[] => {
    const transformedKeepaData: any[] = [];
    let lMinTimestamp = 0;
    let latestKeepaTimestamp = -1;
    let earliestKeepaTimestamp = -1;

    if (keepaCsv) {
      let previousFinalValue = 0;

      for (let valueIndex = 0; valueIndex < keepaCsv.length; valueIndex += 2) {
        const lUnixDateTime = keepaTimeToUnixDateTime(keepaCsv[valueIndex]);

        if (lUnixDateTime < lMinTimestamp) {
          continue;
        }

        let rawValue1 = keepaCsv[valueIndex + 1];
        rawValue1 =
          rawValue1 !== null && rawValue1 !== undefined ? rawValue1 : 0;
        rawValue1 = rawValue1 <= 0 ? -1 : rawValue1;

        let finalValue = rawValue1 <= 0 ? null : rawValue1;

        if (key === "RATING") {
          finalValue = finalValue / 10;
        }

        if (finalValue === null) {
          if (!transformedKeepaData[valueIndex]) {
            transformedKeepaData[valueIndex] = [];
          }
          const dummyValue = [lUnixDateTime - 1, previousFinalValue];
          transformedKeepaData[valueIndex].push(dummyValue);
        }

        const transformedValue = [lUnixDateTime, finalValue];

        latestKeepaTimestamp = Math.max(
          latestKeepaTimestamp,
          transformedValue[0]
        );
        earliestKeepaTimestamp =
          earliestKeepaTimestamp === -1
            ? transformedValue[0]
            : Math.min(earliestKeepaTimestamp, transformedValue[0]);

        let lPrev: any = null;

        if (transformedKeepaData.length) {
          lPrev =
            transformedKeepaData[transformedKeepaData.length - 1]?.slice();
        } else {
          lPrev = transformedValue.slice();
        }
        lPrev[0] = transformedValue[0] - 1;
        transformedKeepaData.push(lPrev);
        transformedKeepaData.push(transformedValue);
        previousFinalValue = finalValue;
      }
    }

    return transformedKeepaData;
  };

  useEffect(() => {
    const AmazonData = processCSVData(chartsData?.csv?.[0]);
    const FBAData = processCSVData(chartsData?.csv?.[10]);
    const FBMData = processCSVData(chartsData?.csv?.[7]);
    const buyBoxData = processCSVData(
      chartsData?.csv?.[18],
      null,
      "buyBoxData"
    );
    const newData = processCSVData(chartsData?.csv?.[1]);
    const salesRankData = processCSVData(chartsData?.csv?.[3], "notPrice");
    const monthlySoldData = processCSVData(
      chartsData?.monthlySoldHistory,
      "notPrice"
    );
    const offersCountData = processCSVData(
      chartsData?.csv?.[11],
      "notPrice",
      "offersCountData"
    );
    const currentUnixTime = Math.floor(Date.now() / 1000);
    const date = new Date(currentUnixTime * 1000);
    const formattedDate = date.toString();
    const transformedData = transformKeepaCsv(chartsData?.csv?.[16], "RATING");
    let ratingData = transformedData.map(([dateStr, price]) => ({
      date: new Date(dateStr),
      price,
    }));
    if (ratingData.length > 0) {
      let lastObject = ratingData[ratingData.length - 1];
      ratingData.push({
        date: date,
        price: lastObject.price,
      });
    }
    const reviewCountData = processCSVData(
      chartsData?.csv?.[17],
      "ReviewCount"
    );
    const monthlySold = {
      date: new Date(formattedDate),
      price: chartsData?.monthlySold || 0,
    };
    if (monthlySoldData.length) monthlySoldData.push(monthlySold);
    const allProcessedData = [
      AmazonData,
      FBAData,
      FBMData,
      buyBoxData,
      newData,
      salesRankData,
      monthlySoldData,
      offersCountData,
      ratingData,
      reviewCountData,
    ];

    setProcessedData(allProcessedData);
    setOrignalDate(allProcessedData);
  }, [chartsData]);
 
  return (
    <>
      {loading ? (
        <div className="loading-loader">
          <Loader />
        </div>
      ) : (
        <div className="ranks-offers">
          {isLoading ? (
            <div className="ranks-loader">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <></>
          )}
          {/* <div className="px-1">
            <Banner
              bannerText={
                "Use of Google Chrome and the SAS Chrome Extension are required for full functionality and all features in the SAS Web App. install the SAS "
              }
              bannerlink={"Chrome Extension"}
            />
          </div> */}
          <div className="d-flex justify-content-between main-columm">
            <h1 className="title-heading">Overview</h1>
            {/* <div className="filter-box d-flex justify-content-center align-items-center">
              <CiFilter />
            </div> */}
          </div>
          <div className="grid-container">
            <div className="grid-item d-flex flex-column gap-2 overflow-hidden">
              <div className="product-container d-flex justify-content-between align-items-center gap-1 overflow-hidden">
                <div className="product-details-button d-flex gap-1 overflow-hidden">
                  <a href="#quick-info" className="boxer-btn">
                    <FaBoltLightning />
                  </a>
                  <a href="#ranks-prices" className="boxer-btn">
                    <FaHashtag />
                  </a>
                  <a href="#alerts" className="boxer-btn">
                    <FaBell />
                  </a>
                  <a href="#analysis" className="boxer-btn">
                    <FaChartPie />
                  </a>
                  <a href="#chartss" className="boxer-btn">
                    <FaChartLine size={17} />
                  </a>
                  <a href="#calculator" className="boxer-btn">
                    <HiCalculator size={17} />
                  </a>
                  <a href="#variations" className="boxer-btn">
                    <PiSquaresFourFill size={16} />
                  </a>
                  <a href="#notes" className="boxer-btn">
                    <FaTag />
                  </a>
                  <a href="#discounts" className="boxer-btn">
                    <FaPercentage />
                  </a>
                  <a href="#settings" className="boxer-btn">
                    <FaBalanceScale size={16} />
                  </a>
                  <a href="#world" className="boxer-btn">
                    <TiWorld size={20} />
                  </a>
                  <a href="#cart" className="boxer-btn">
                    <FaShoppingCart size={16} />
                  </a>
                  <a href="#lookup" className="boxer-btn">
                    <FaRegEye size={16} />
                  </a>
                  <a href="#location" className="boxer-btn">
                    <FaLocationDot size={16} />
                  </a>
                  <a href="#ebay" className="boxer-btn">
                    <b style={{ fontSize: "18px" }}>e</b>
                  </a>
                  <a href="#amazon" className="boxer-btn">
                    <FaAmazon size={16} />
                  </a>
                  <a href="#again" className="boxer-btn">
                    <CiSearch size={16} />
                  </a>
                  <a href="#roiii" className="boxer-btn">
                    <SlCalender size={16} />
                  </a>
                  <a href="#keepa" className="boxer-btn">
                    <FaPlusCircle size={16} />
                  </a>
                </div>
                <Product
                  productDetails={productDetails?.productDetails}
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                />
              </div>
              <div className="quick-info">
                <QuickInfo
                  productDetails={productDetails}
                  setProductDetails={setProductDetails}
                  offers={offers}
                  setOffers={setOffers}
                  roi={roi}
                  setRoi={setRoi}
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  totalDiscount={totalDiscount}
                  calculateProfit={calculateProfit}
                  getOffers={getOffers}
                  offersFilter={offersFilter}
                  alerts={alerts}
                />
              </div>
              <div className="ranks-and-prices">
                <RanksAndPrices
                  ranksAndPrices={ranksAndPrices}
                  rankFilter={rankFilter}
                  setRankFilter={setRankFilter}
                  activeKey={dropdownStates}
                  loading={ranksLoader}
                  setActiveKey={setDropdownStates}
                  getRanksAndPrices={getRanks}
                  handleToggle={handleToggle}
                  calculateNetPrice={calculateNetPrice}
                />
              </div>
              <div className="ebay-container">
                <Widget
                  title="Alerts"
                  icon="alert"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  data={productVariation}
                  alerts={alerts}
                  children={<Alerts data={productVariation} alerts={alerts} />}
                />
              </div>

            </div>
            <div className="grid-item d-flex flex-column gap-2">
              <div className="ebay-container">
                <Widget
                  title="Charts"
                  icon="charts"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={
                    <Charts
                      chartsData={processedData}
                      orignalData={orignalData}
                      chartsFilter={chartsFilter}
                      chartsLoader={chartsLoader}
                      setChartsLoader={setChartsLoader}
                    />
                  }
                />
              </div>
              <div className="profit-calculator">
                <ProfitCalculator
                  productDetails={productDetails}
                  estimates={estimates}
                  setProductDetails={setProductDetails}
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  offers={offers}
                  setOffers={setOffers}
                  roi={roi}
                  setRoi={setRoi}
                  totalDiscount={totalDiscount}
                  setFulFillmentType={setFulFillmentType}
                  calculateProfit={calculateProfit}
                  referralFee={referralFeePercentage}
                  getOffers={getOffers}
                  offersFilter={offersFilter}
                  isLoading={isLoading}
                  setIsStorageFee={setIsStorageFee}
                />
              </div>

              <div className="ebay-container">
                <Widget
                  title="Notes & Tags"
                  icon="flag"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={
                    <Notes
                      data={notesButton}
                      productDetails={productDetails}
                      getAllNotes={getAllNotes}
                      notes={notes}
                      setAllNotes={setAllNotes}
                      searchResult={searchResult}
                    />
                  }
                />
              </div>
              {/* <div className="ebay-container">
                <Widget
                  title="Discounts"
                  icon="discounts"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={
                    <Discounts
                      data={discounts}
                      productDetails={productDetails}
                      setProductDetails={setProductDetails}
                      setTotalDiscount={setTotalDiscount}
                    />
                  }
                />
              </div> */}
            </div>
            <div className="grid-item d-flex flex-column gap-2">
              <div className="ebay-container">
                <Widget
                  title="Buy Box Analysis"
                  icon="piechart"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={
                    <Analysis
                      buyBoxAnalysis={buyBoxAnalysis}
                      selectedDay={selectedDay}
                      setSelectedDay={setSelectedDay}
                      setBuyBoxFilter={setBuyBoxFilter}
                      buyBoxLoader={buyBoxLoader}
                      setBuyBoxLoader={setBuyBoxLoader}
                    />
                  }
                />
              </div>
              {/* <div className="ebay-container">
                <Widget
                  title="Vat Settings"
                  icon="scale"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={<VatSettings data={[]} />}
                />
              </div> */}
              {/* <div className="ebay-container">
                <Widget
                  title="European Marketplaces"
                  icon="market"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={<Marketplace />}
                />
              </div> */}
              <div className="offers-container">
                <Widget
                  title="Offers"
                  icon="shoppingcart"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={
                    <Offers
                      offers={offers}
                      getOffers={getOffers}
                      productDetails={productDetails}
                    />
                  }
                />
              </div>
              <div className="ebay-container">
                <Widget
                  title="R.O.I."
                  icon="roi"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={
                    <Roi roiData={roiData} productDetails={productDetails} />
                  }
                />
              </div>
              <div className="ebay-container">
                <Widget
                  title="Keepa"
                  icon="keepa"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={
                    <Keepa
                      data={keepa}
                      selectedCountry={selectedCountry}
                      selectedDay={selectedDay}
                      setSelectedCountry={setSelectedCountry}
                      setSelectedDay={setSelectedDay}
                      loading={keepaLoader}
                    />
                  }
                />
              </div>
              {/* <div className="ebay-container">
                <Widget
                  title="Lookup Details"
                  icon="eye"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={<VLookupDetails />}
                />  
              </div> */}
              {/* <div className="ebay-container">
                <Widget
                  title="Geo location"
                  icon="location"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={<Location />}
                />
              </div> */}
            </div>
            <div className="grid-item d-flex flex-column gap-2">
              <div className="ebay-container">
                <Widget
                  title="Variations"
                  icon="blocks"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  variations={variations}
                  children={<Variations variations={variations} columns={columns} variationLoadings={variationLoadings}/>}
                />
              </div>
              <div className="ebay-container">
                <Widget
                  title="eBay"
                  icon="e"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={<Ebay data={ebay} />}
                />
              </div>
              <div className="ebay-container">
                <Widget
                  title="Seller Central"
                  icon="amazon"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={<SellerCentral data={sellerCentral} />}
                />
              </div>
              <div className="ebay-container">
                <Widget
                  title="Search Again"
                  icon="search"
                  activeKey={dropdownStates}
                  setActiveKey={setDropdownStates}
                  handleToggle={handleToggle}
                  children={<SearchAgain />}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Widgets;