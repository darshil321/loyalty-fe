// import { useAppBridge } from "@shopify/app-bridge-react";
import type {
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
// import { useAppSelector } from "@/store/hooks";

// Axios instance with base URL setup
let axiosAPIInstance: AxiosInstance = axios.create({
  baseURL: `https://ub8x9415tg.execute-api.us-east-2.amazonaws.com/v1/`,
  timeout: 10000,
});
// Function to get the session token
const getSessionTokens = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const shopify = useAppBridge();
  try {
    const token = localStorage.getItem("devx_loyalty_access_token");
    console.log("token inini", token);

    if (token) {
      return token;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch session token", error);
    throw new Error("Failed to authenticate.");
  }
};

export const setupAxiosInterceptors = () => {
  axiosAPIInstance.interceptors.request.use(
    async (
      config: InternalAxiosRequestConfig
    ): Promise<InternalAxiosRequestConfig> => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Response interceptor to handle responses and errors
axiosAPIInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data) return response.data;
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Custom methods for common HTTP verbs
const request = (
  method: Method,
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return axiosAPIInstance.request({
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: getSessionTokens(),
    },
    ...config,
  });
};

const get = (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return request("get", url, config);
};

const post = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return request("post", url, { data, ...config });
};

const put = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return request("put", url, { data, ...config });
};

const _delete = (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return request("delete", url, config);
};

export { get, post, put, _delete };
export default axiosAPIInstance;
