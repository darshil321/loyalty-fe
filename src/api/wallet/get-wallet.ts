import { get } from "../../lib/axios-api-instance";
import { handleAxiosError } from "../../lib/error-handler";
import { logger } from "../../lib/logger";

export const getCustomerWalletAPI = async () => {
  try {
    const apiCall = await get(`/loyalty_wallet/get-my-wallet`);
    const response = apiCall.data;

    logger.info("getCustomerWalletAPI", "getCustomerWalletAPI", response);
    return response;
  } catch (e: any) {
    const handledError = handleAxiosError(e);
    throw handledError;
  }
};
