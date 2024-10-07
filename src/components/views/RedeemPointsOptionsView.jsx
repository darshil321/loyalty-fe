import { Button } from "../ui/button";
import { ViewEnum } from "../../lib/constants";
import { createCouponAPI } from "../../api/coupon/create-coupon";
import { LeftArrowIcon } from "../ui/svg";

const RedeemPointsOptionsView = ({
  setLoading,
  setError,
  userData,
  setCouponCode,
  onRedeemPointClick,
  onBack,
  setCreateCouponData,
}) => {
  // This function now takes createCouponData as a parameter to ensure it has the latest data
  const fetchCoupon = async (couponData) => {
    setLoading(true);
    try {
      const res = await createCouponAPI(couponData);
      setCouponCode(res.code);
      console.log("couponRes", res);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeemPointClick = (event) => {
    const couponData = {
      ...event,
      value: event.points,
      minOrderValue: event.minOrderValue,
      maxOrderValue: event.maxOrderValue,
    };
    setCreateCouponData(couponData); // Assuming you still need to update some state with this data
    fetchCoupon(couponData); // Pass the data directly

    onRedeemPointClick(ViewEnum.REDEEM_POINTS);
  };

  const renderEvent = (event, index) => (
    <div key={index} className="flex items-center justify-between">
      <div>
        <p className="text-base font-medium text-black lowercase">
          {event.event.replace(/_/g, " ")}
        </p>
        <p className="text-sm text-muted-foreground">
          get {event.points}{" "}
          {event.spendingType === "FIXED" ? "points" : "% percentage"} off
        </p>
      </div>
      <Button
        variant="outline"
        onClick={() => handleRedeemPointClick(event)}
        className="px-4 py-2 text-black"
      >
        Redeem Points
      </Button>
    </div>
  );
  const renderEvents = () => {
    const redeemableEvents =
      userData?.events?.filter((event) => event.type === "DEBIT") || [];

    if (redeemableEvents.length === 0) {
      return (
        <p className="text-sm text-black">
          You currently have no events available to redeem points.
        </p>
      );
    }

    return <div className="space-y-4">{redeemableEvents.map(renderEvent)}</div>;
  };

  return (
    <>
      <h3 className="text-lg font-semibold px-4 pt-2 text-black">
        Redeem points
      </h3>
      <div className="p-4">{renderEvents()}</div>
      <div className="rounded-b-lg bg-gray-100 p-4 text-center">
        <Button
          variant="outline"
          className="w-full text-black"
          onClick={onBack}
        >
          <LeftArrowIcon className="h-4 w-5 text-black" /> Go Back
        </Button>
      </div>
    </>
  );
};

export default RedeemPointsOptionsView;
