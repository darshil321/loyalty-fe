import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { getCustomerWalletAPI } from "../api/wallet/get-wallet";

export default function LoyaltyPopUpDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSignedUp, setIsSignedUp] = React.useState(false);
  const [userData, setUserData] = React.useState({
    name: "",
    points: 0,
    balance: 0,
    transaction: [],
    events: [],
  });

  const ViewEnum = {
    SIGN_UP: "SIGN_UP",
    SIGNED_UP: "SIGNED_UP",
    BALANCE: "BALANCE",
    EARN_POINTS: "EARN_POINTS",
    REDEEM_POINTS_OPTIONS: "REDEEM_POINTS_OPTIONS",
    REDEEM_POINTS: "REDEEM_POINTS",
  };

  const [view, setView] = React.useState(ViewEnum.SIGN_UP);

  useEffect(() => {
    if (isOpen) {
      changeView(ViewEnum.SIGN_UP);
    }
    handleSignUp();
  }, [isOpen]);
  const userId = "1";

  const handleSignUp = () => {
    if (userId) {
      setIsSignedUp(true);
      changeView(ViewEnum.SIGNED_UP);
      getCustomerWallet();
    }
  };
  const getCustomerWallet = async () => {
    const res = await getCustomerWalletAPI();
    console.log("res", res);
    if (res) {
      setUserData(res);
    }
  };
  const handleViewBalance = () => {
    changeView(ViewEnum.BALANCE);
  };

  const handleRedeemPoints = () => {
    changeView(ViewEnum.REDEEM_POINTS);
  };
  const handleBack = () => {
    changeView(ViewEnum.SIGNED_UP);
  };
  const handleEarnPoints = () => {
    changeView(ViewEnum.EARN_POINTS);
  };
  const handleCloseRedeemPoints = () => {
    changeView(ViewEnum.REDEEM_POINTS_OPTIONS);
  };

  const changeView = (view) => {
    setView(view);
  };
  const loyalyView = () => {
    switch (view) {
      case ViewEnum.SIGN_UP:
        return (
          <div className="rounded-t-xl bg-white p-4">
            <div className="flex flex-col items-center justify-center">
              <p className="text-center text-sm text-black">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                sequi minima sunt, aspernatur aperiam dignissimos necessitatibus
              </p>
              <Button
                className="mt-2 bg-orange-300 text-white"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              <Button
                variant="outline"
                className="flex h-12 w-full items-center justify-between py-[16px]"
                onClick={handleViewBalance}
              >
                <span className="flex items-center space-x-2 text-black">
                  <WalletIcon className="h-5 w-5 text-[#d3c39b]" />
                  <span>My Balance</span>
                </span>
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="flex h-12 w-full items-center justify-between py-[16px]"
                onClick={handleRedeemPoints}
              >
                <span className="flex items-center space-x-2 text-black">
                  <TicketIcon className="h-5 w-5 text-[#d3c39b]" />
                  <span>Redeem points</span>
                </span>
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        );
      case ViewEnum.SIGNED_UP:
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-black">
              Your points: {userData.points}{" "}
              <InfoIcon className="inline h-4 w-4" />
            </h3>
            <div className="mt-4 space-y-4">
              <Button
                variant="outline"
                className="flex h-12 w-full items-center justify-between py-[16px]"
                onClick={() => setView(ViewEnum.BALANCE)}
              >
                <span className="flex items-center space-x-2 text-black">
                  <WalletIcon className="h-5 w-5 text-[#d3c39b]" />
                  <span>My Balance</span>
                </span>
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="flex h-12 w-full items-center justify-between py-[16px]"
                onClick={handleRedeemPoints}
              >
                <span className="flex items-center space-x-2 text-black">
                  <TicketIcon className="h-5 w-5 text-[#d3c39b]" />
                  <span>Redeem points</span>
                </span>
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={handleEarnPoints}
                className="flex h-12 w-full items-center justify-between py-[16px]"
              >
                <span className="flex items-center space-x-2 text-black">
                  <TicketIcon className="h-5 w-5 text-[#d3c39b]" />
                  <span>Earn points</span>
                </span>
                <ChevronRightIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        );
      case ViewEnum.BALANCE:
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold text-black">
              Your balance: ${userData.balance}
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black">Deposit</p>
                  <p className="text-sm text-muted-foreground">June 15, 2023</p>
                </div>
                <p className="text-lg font-semibold">+$500</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black">Withdrawal</p>
                  <p className="text-sm text-muted-foreground">June 10, 2023</p>
                </div>
                <p className="text-lg font-semibold">-$300</p>
              </div>
              <div className="rounded-b-lg bg-gray-100 p-4 text-center">
                <Button
                  variant="outline"
                  className="w-full text-black"
                  onClick={handleBack}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        );
      case ViewEnum.EARN_POINTS:
        return (
          <>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Refer a friend
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earn 100 points
                    </p>
                  </div>
                  <Button variant="outline" className="px-4 py-2 text-black">
                    Earn
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Complete a survey
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earn 50 points
                    </p>
                  </div>
                  <Button variant="outline" className="px-4 py-2 text-black">
                    Earn
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Write a review
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earn 25 points
                    </p>
                  </div>
                  <Button variant="outline" className="px-4 py-2 text-black">
                    Earn
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-b-lg bg-gray-100 p-4 text-center">
              <Button
                variant="outline"
                className="w-full text-black"
                onClick={handleBack}
              >
                Go Back
              </Button>
            </div>
          </>
        );
      case ViewEnum.REDEEM_POINTS_OPTIONS:
        return (
          <>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Refer a friend
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earn 100 points
                    </p>
                  </div>
                  <Button variant="outline" className="px-4 py-2 text-black">
                    Earn
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Complete a survey
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earn 50 points
                    </p>
                  </div>
                  <Button variant="outline" className="px-4 py-2 text-black">
                    Earn
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Write a review
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earn 25 points
                    </p>
                  </div>
                  <Button variant="outline" className="px-4 py-2 text-black">
                    Earn
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-b-lg bg-gray-100 p-4 text-center">
              <Button
                variant="outline"
                className="w-full text-black"
                onClick={handleBack}
              >
                Go Back
              </Button>
            </div>
          </>
        );
      case ViewEnum.REDEEM_POINTS:
        return (
          <>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Refer a friend
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earn 100 points
                    </p>
                  </div>
                  <Button variant="outline" className="px-4 py-2 text-black">
                    Earn
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Complete a survey
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earn 50 points
                    </p>
                  </div>
                  <Button variant="outline" className="px-4 py-2 text-black">
                    Earn
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">
                      Write a review
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Earn 25 points
                    </p>
                  </div>
                  <Button variant="outline" className="px-4 py-2 text-black">
                    Earn
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-b-lg bg-gray-100 p-4 text-center">
              <Button
                variant="outline"
                className="w-full text-black"
                onClick={handleCloseRedeemPoints}
              >
                Go Back
              </Button>
            </div>
          </>
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
        className="fixed bottom-4 right-4 rounded-full bg-orange-300"
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

            <div className="h-32 rounded-t-lg bg-orange-300 p-4 max-h-max text-white">
              <h2 className="text-xl font-bold text-black">
                Welcome {userData.name}
              </h2>
            </div>
            {loyalyView()}
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

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function GiftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function TicketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
