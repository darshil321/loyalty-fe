import { get } from "../../lib/axios-api-instance";
import { logger } from "../../lib/logger";

export const getCustomerWalletAPI = async () => {
  try {
    const apiCall = await get(`/loyalty_wallet/get-my-wallet`);
    const response = apiCall.data;

    logger.info("getCustomerWalletAPI", "getCustomerWalletAPI", response);
    return response;
  } catch (e: any) {
    logger.error("getCustomerWalletAPI", "getCustomerWalletAPI", e);

    let errorMessage = "An unknown error occurred";

    if (e && e._response) {
      try {
        const errorResponse = JSON.parse(e._response);
        errorMessage = errorResponse.error || errorMessage;
      } catch (parseError) {
        logger.error(
          "getCustomerWalletAPI",
          "Failed to parse error response",
          parseError
        );
      }
    } else {
      errorMessage = e.message || errorMessage;
    }

    const err = new Error(errorMessage);
    throw err;
  }
};
