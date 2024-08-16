import { post } from "../../lib/axios-api-instance";
import { logger } from "../../lib/logger";

export const createCouponAPI = async (value: number) => {
  const couponData = {
    value,
    typeOfDiscount: "fixed_amount",
  };
  try {
    const apiCall = await post(`/loyalty_coupon`, couponData);

    const response = apiCall.data;

    logger.info("createCouponAPI", "createCouponAPI", response);
    return response;
  } catch (e: any) {
    logger.error("createCouponAPI", "createCouponAPI", e);
    let errorMessage = "An unknown error occurred";

    if (e && e._response) {
      try {
        const errorResponse = JSON.parse(e._response);
        errorMessage = errorResponse.error || errorMessage;
      } catch (parseError) {
        logger.error(
          "createCouponAPI",
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
