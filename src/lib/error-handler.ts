import { updateAxiosHeaders } from "./axios-api-instance";
import { logger } from "./logger";

// Function to handle Axios errors
export const handleAxiosError = async (error) => {
  let errorMessage = "An unknown error occurred";
  let statusCode: number | null = null;
  console.log("error)(())((", error);

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    statusCode = error.response.status;
    const errorResponse = error.response.data;
    console.log("errorResponse0000000", statusCode);
    // Customize message based on status code
    switch (statusCode) {
      case 403:
        localStorage.setItem("kp_jwt_token", "");
        errorMessage =
          "Access Denied: You do not have permission to access this resource.";
        break;
      case 404:
        errorMessage = "The requested resource was not found.";
        break;
      case 500:
        errorMessage = "Internal Server Error: Please try again later.";
        break;
      default:
        errorMessage =
          errorResponse.message || "Error processing your request.";
        break;
    }
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage =
      "No response from the server. Please check your network connection.";
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.message || "Error setting up the request.";
  }

  // Log the error for debugging
  logger.error("handleAxiosError", "Error processing request", {
    errorMessage,
    statusCode,
  });

  const err = new Error(errorMessage);
  err.statusCode = statusCode; // Attach status code to error object for further handling
  return err;
};
