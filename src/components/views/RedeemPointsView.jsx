import { useState } from "react";
import { Button } from "../ui/button";

const RedeemPointsView = ({ couponCode, onBack, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-y-2 flex-col">
            <div>
              <p className="text-sm font-medium text-black">
                {loading
                  ? "Loading coupon code..."
                  : "Duplicate the Promotional Code"}
              </p>
            </div>
            <input
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-black"
              type="text"
              value={loading ? "Loading..." : couponCode || ""}
              readOnly
            />
            {!loading && couponCode && (
              <Button
                variant="outline"
                className="px-4 py-2 w-full text-black"
                onClick={handleCopyCode}
                disabled={!couponCode || loading}
              >
                {copied ? "Copied!" : "Copy Code"}
              </Button>
            )}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="rounded-b-lg bg-gray-100 p-4 text-black text-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="rounded-b-lg bg-gray-100 p-4 text-center">
          <Button
            variant="outline"
            className="w-full text-black"
            onClick={onBack}
          >
            Go Back
          </Button>
        </div>
      )}
    </>
  );
};

export default RedeemPointsView;
