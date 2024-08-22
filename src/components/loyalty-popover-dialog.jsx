import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
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

  const getCustomerWallet = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const walletResponse = await getCustomerWalletAPI();
      if (walletResponse && walletResponse.wallet) {
        setUserData({
          ...userData,
          name: walletResponse.wallet.email,
          points: walletResponse.wallet.totalPoints,
          balance: walletResponse.wallet.balance,
          events: walletResponse.tier.events,
          userId: walletResponse.wallet.userId,
        });
        setView(ViewEnum.INITIAL);
      }
    } catch (error) {
      setError("Failed to fetch wallet data");
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const transactions = await getTransactionByUserIdAPI(userData.userId);
      setUserData((prevData) => ({
        ...prevData,
        transactions,
      }));
    } catch (error) {
      setError("Failed to fetch transactions");
      console.error("Transaction error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userData.userId]);

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

  const renderView = useMemo(() => {
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
            isLoading={isLoading}
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
  }, [userData, isLoading, error, handleViewChange, fetchTransactions]);

  useEffect(() => {
    const handleOpenDialog = () => {
      setIsOpen(true);
    };

    // Listen for the custom event
    window.addEventListener("openDialog", handleOpenDialog);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("openDialog", handleOpenDialog);
    };
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full bg-[#CCD5AE]"
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

            <div className="h-32 rounded-t-lg bg-[#CCD5AE] p-4 max-h-max text-white">
              <h2 className="text-xl font-bold text-black">
                Welcome {userData.name}
              </h2>
            </div>
            {renderView}
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
