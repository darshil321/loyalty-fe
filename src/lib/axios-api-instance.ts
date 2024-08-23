// import { useAppBridge } from "@shopify/app-bridge-react";
import type {
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";
import { getUserTokenAPI } from "../api/auth/user-auth";
// import { useAppSelector } from "@/store/hooks";

// Axios instance with base URL setup
let axiosAPIInstance: AxiosInstance = axios.create({
  baseURL: `https://ub8x9415tg.execute-api.us-east-2.amazonaws.com/v1/`,
  timeout: 10000,
});
// Function to get the session token
export const getSessionTokens = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const shopify = useAppBridge();
  try {
    const jwtLocalToken = localStorage.getItem("kp_jwt_token");
    let _token: null | string = null;

    if (jwtLocalToken) {
      _token = `${jwtLocalToken}`;
      console.log("token======", _token);

      return _token;
    }

    const jwtToken = await getUserTokenAPI();
    console.log("jwtToken", jwtToken);
    if (!jwtToken) throw new Error("Failed to authenticate.");

    _token = `Bearer ${jwtToken}`;
    localStorage.setItem("kp_jwt_token", _token);

    return _token;
  } catch (error) {
    console.error("Failed to fetch session token", error);
    throw new Error("Failed to authenticate.");
  }
};

export const updateAxiosHeaders = async () => {
  try {
    const jwtToken = await getUserTokenAPI();
    if (!jwtToken) throw new Error("Failed to authenticate.");

    localStorage.setItem("kp_jwt_token", jwtToken);

    axiosAPIInstance.request({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  } catch (error) {
    console.log("error", error);
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
const request = async (
  method: Method,
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return axiosAPIInstance.request({
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: await getSessionTokens(),
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
