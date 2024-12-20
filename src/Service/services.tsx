import { default as httpClient } from "axios";
// const baseUrl = "https://api.sellerscout.com";
const baseUrl = "https://testapi.sellerscout.com";
// const baseUrl = "http://localhost:5278";
var authorization: string;
export const token = () => {
  const accessToken = localStorage.getItem("accessToken");
  authorization = "Bearer " + accessToken;
};
const axios = httpClient.create({
  baseURL: baseUrl,
});
axios.interceptors.response.use(
  (response) => response, // Pass the response if no error
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear any stored token or authentication data
      localStorage.removeItem("accessToken");
      // Redirect to the home route
      window.location.href = "/";
    }
    return Promise.reject(error); // Reject the error so it can be handled elsewhere if needed
  }
);

export const login = (data: any) => {
  const { email, password } = data;
  return axios.post(`${baseUrl}/Account/Login`, {
    email,
    password,
  });
};
export const registeration = (data: any) => {
  const { userName, email, password } = data;
  return axios.post(`${baseUrl}/Account/Register`, {
    userName,
    email,
    password,
  });
};
export const logout = () => {
  return axios.post(`${baseUrl}/Account/Logout`, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};
export const uploadFile = (file: any) => {
  return axios.post(`${baseUrl}/ProductUpload/UploadFile`, file, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: authorization,
    },
  });
};
export const productUpload = (request: any) => {
  return axios.post(
    `${baseUrl}/ProductUpload/UploadList`,
    { request },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
};
export const addProductUpload = (request: any) => {
  return axios.post(`${baseUrl}/ProductUpload/AddProductUpload`, request, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};
export const addProductUploadList = (productId: any) => {
  return axios.get(
    `https://testapi.sellerscout.com/Product/${productId}/ProductDetails`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
};
export const getKeepa = (productId: any, country: any, range: any) => {
  return axios.get(
    `${baseUrl}/Keepa/KeepaPriceHistory/${productId}?Country=${country}&Range=${range}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      responseType: "arraybuffer",
    }
  );
};

export const getProductVariations = (productId: any) => {
  return axios.get(`${baseUrl}/Product/${productId}/ProductVariations`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};

export const getAlerts = (productId: any) => {
  return axios.get(`${baseUrl}/Product/${productId}/Alerts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};

export const productDetails = (
  productId: any,
  request: any,
  IsFavoriteFile: any
) => {
  return axios.post(`${baseUrl}/ProductUpload/${productId}/Products`, request, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
      IsFavoriteFile: IsFavoriteFile,
    },
  });
};
export const getGraphDetails = (datas: any) => {
  const { country, asin, range } = datas;
  return axios.get(
    `${baseUrl}/Keepa/KeepaPriceHistory/${asin}?Country=${country}&Range=${range}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      responseType: "arraybuffer",
    }
  );
};

export const getSellerOffer = (datas: any) => {
  const { country, asin } = datas;
  return axios.get(
    `https://testapi.sellerscout.com/${country}/${asin}/SellerOffers`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
};
export const getSellerVariation = (datas: any) => {
  const { country, asin } = datas;
  return axios.get(
    `https://testapi.sellerscout.com/Product/${asin}/ProductVariations`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
        MarketPlace: country,
      },
    }
  );
};
export const getSellerCalculate = (datas: any) => {
  return axios.post(`https://testapi.sellerscout.com/Product/CalculateROI`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};
export const ProductUploadProcess = () => {
  return axios.post(`${baseUrl}/ProductUpload/UploadProcess`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};

export const getFavListSource = (code: any) => {
  return axios.get(`${baseUrl}/Favorite/GetFavoritesBySource/${code}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};
export const postFavListSource = (string: any) => {
  return axios.post(
    `${baseUrl}/Favorite`,
    { favoriteName: string },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
};
export const addFavListProduct = (request: any) => {
  return axios.post(`${baseUrl}/Product/AddProductsToFavorite`, request, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};
export const getAllFavList = () => {
  return axios.get(`${baseUrl}/Favorite`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};
export const exportFile = (Id: any, request: any, fileName: any) => {
  return axios.post(`${baseUrl}/ProductUpload/${Id}/ExportProducts`, request, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
      ExportFileName: fileName,
    },
  });
};
export const ProductRoi = (request: any) => {
  return axios.post(`${baseUrl}/Product/CalculateROI`, request, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};
export const FavListIsExists = (favoriteName: string) => {
  return axios.get(
    `${baseUrl}/Favorite/IsExists?FavoriteName=${favoriteName}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
};

export const getProductInfo = (productId: any) => {
  return axios.get(`${baseUrl}/ProductUpload/${productId}/QuickScan`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};

export const getRanksAndPrices = (productId: any, range: any) => {
  return axios.get(
    `${baseUrl}/Product/Ranks?ASIN=${productId}&Range=${range}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
};

export const getSellerOffers = (
  productId: any,
  prime: any,
  live: any,
  cost: any
) => {
  return axios.get(
    `${baseUrl}/Product/${productId}/SellerOffers?Prime=${prime}&Live=${live}&Cost=${cost}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
};

export const getNotes = (productId: any) => {
  return axios.get(`${baseUrl}/Product/${productId}/Notes`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};
export const deleteNotes = (noteId: any) => {
  return axios.delete(`${baseUrl}/Product/${noteId}/Note`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};
export const saveNote = (request: any) => {
  return axios.post(`${baseUrl}/Product/Note`, request, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};

export const putNotes = (request: any) => {
  return axios.put(`${baseUrl}/Product/Note`, request, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};


export const profitCalculate = (request: any) => {
  return axios.post(`${baseUrl}/Product/ProfitCalculate`, request, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};

export const getBuyBoxAnalysis = (productId: any, range: any) => {
  return axios.get(
    `${baseUrl}/Product/${productId}/BuyBoxAnalysis?Range=${range}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    }
  );
};

export const getCharts = (productId: any, range: any) => {
  return axios.get(`${baseUrl}/Keepa/Chart/${productId}?Range=${range}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};

export const productHistory = (request: any) => {
  return axios.post(`${baseUrl}/productUpload/History`, request, {
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};

export const deleteProductUpload = (request: any) => {
  return axios.delete(`${baseUrl}/ProductUpload/DeleteProductUpload`, {
    data: request,
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  });
};