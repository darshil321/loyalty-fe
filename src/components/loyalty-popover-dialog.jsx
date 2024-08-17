import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { getCustomerWalletAPI } from "../api/wallet/get-wallet";
import { ViewEnum } from "../lib/constants";
import SignUpView from "./views/SignUpView";
import InitialView from "./views/InitialView";
import BalanceView from "./views/BalanceView";
import EarnPointsView from "./views/EarnPointsView";
import RedeemPointsOptionsView from "./views/RedeemPointsOptionsView";
import { GiftIcon, XIcon } from "./ui/svg";
import { getTransactionByUserIdAPI } from "../api/transaction/get-transaction";
import RedeemPointsView from "./views/RedeemPointsView";

export default function LoyaltyPopUpDialog() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [userData, setUserData] = React.useState({
    points: 0,
    balance: 0,
    transaction: [],
    events: [],
    tier: [],
  });

  const [view, setView] = React.useState(ViewEnum.SIGN_UP);

  useEffect(() => {
    if (isOpen) {
      handleViewChange(ViewEnum.SIGN_UP);
    }
    handleSignUp();
  }, [isOpen]);
  const userId = "1";

  const handleSignUp = () => {
    if (userId) {
      handleViewChange(ViewEnum.INITIAL);
      getCustomerWallet();
    }
  };
  const getCustomerWallet = async () => {
    const res = await getCustomerWalletAPI();
    if (res && res.wallet) {
      setUserData({
        name: res.wallet.email,
        points: res.wallet.totalPoints,
        balance: res.wallet.balance,
        transactions: [],
        events: res.tier.events,
        userId: res.wallet.userId,
      });
    }
  };

  const fetchTransactions = async () => {
    const transactions = await getTransactionByUserIdAPI(userData?.userId); // Replace with your actual API call
    setUserData((prevData) => ({
      ...prevData,
      transactions: transactions,
    }));
  };

  const handleViewBalance = () => {
    fetchTransactions();
    setView(ViewEnum.BALANCE);
  };

  const handleViewChange = (view) => {
    setView(view);
  };
  const [createCouponData, setCreateCouponData] = React.useState({
    value: 0,
    minOrderValue: 0,
    maxOrderValue: 0,
  });
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const renderView = () => {
    switch (view) {
      case ViewEnum.SIGN_UP:
        return (
          <SignUpView onSignUp={handleSignUp} onViewChange={handleViewChange} />
        );
      case ViewEnum.INITIAL:
        return (
          <InitialView
            handleViewBalance={handleViewBalance}
            userData={userData}
            onNavigate={handleViewChange}
          />
        );
      case ViewEnum.BALANCE:
        return (
          <BalanceView
            userData={userData}
            onBack={() => handleViewChange(ViewEnum.INITIAL)}
          />
        );
      case ViewEnum.EARN_POINTS:
        return (
          <EarnPointsView
            userData={userData}
            onBack={() => handleViewChange(ViewEnum.INITIAL)}
          />
        );
      case ViewEnum.REDEEM_POINTS_OPTIONS:
        return (
          <RedeemPointsOptionsView
            setLoading={setLoading}
            setError={setError}
            setCreateCouponData={setCreateCouponData}
            userData={userData}
            setCouponCode={setCouponCode}
            createCouponData={createCouponData}
            onRedeemPointClick={handleViewChange}
            onBack={() => handleViewChange(ViewEnum.INITIAL)}
          />
        );
      case ViewEnum.REDEEM_POINTS:
        return (
          <RedeemPointsView
            loading={loading}
            error={error}
            couponCode={couponCode}
            createCouponData={createCouponData}
            userData={userData}
            onBack={() => handleViewChange(ViewEnum.REDEEM_POINTS_OPTIONS)}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full bg-green-300"
        onClick={() => setIsOpen(true)}
      >
        <GiftIcon className="h-6 w-6 text-white" />
      </Button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center h-full  justify-center bg-black bg-opacity-50">
          <div className="relative w-full h-fit  max-w-sm rounded-lg bg-white">
            <Button
              className="absolute right-2  top-2 !bg-transparent focus:outline-none focus:ring-0 "
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="h-6 w-6 text-gray-500" />
            </Button>

            <div className="h-32 rounded-t-lg bg-green-300 p-4 max-h-max text-white">
              <h2 className="text-xl font-bold text-black">
                Welcome {userData.name}
              </h2>
            </div>
            {renderView()}
            <div className="rounded-b-lg bg-gray-100 p-4 text-center">
              <p className="text-sm text-gray-500">
                We reward with <span className="text-pink-500">Loyal X</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
