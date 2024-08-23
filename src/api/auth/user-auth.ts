import axios from "axios";
import { post } from "../../lib/axios-api-instance";
import { logger } from "../../lib/logger";
import { handleAxiosError } from "../../lib/error-handler";

export const getUserTokenAPI = async () => {
  try {
    const userId = localStorage.getItem("kp_customer_id");

    if (!userId) return null;

    const apiCall = await axios.post(
      `https://ub8x9415tg.execute-api.us-east-2.amazonaws.com/v1//user/auth`,
      {
        userId: userId,
        storeName: "dhruv-parekh-demo.myshopify.com",
      }
    );
    const response = apiCall.data.token;

    logger.info("getUserTokenAPI", "getUserTokenAPI", response);
    return response;
  } catch (e: any) {
    const handledError = handleAxiosError(e);
    throw handledError;
  }
};
