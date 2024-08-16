import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { getCustomerWalletAPI } from "../api/wallet/get-wallet";

export default function LoyaltyPopUpDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSignedUp, setIsSignedUp] = React.useState(false);
  const [isViewingBalance, setIsViewingBalance] = React.useState(false);
  const [isViewingEarnPointsOptions, setIsViewingEarnPointsOptions] =
    React.useState(false);
  const [isViewingRedeemOptions, setIsViewingRedeemOptions] =
    React.useState(false);

  const [userData, setUserData] = React.useState({
    name: "",
    points: 0,
    balance: 0,
    transaction: [],
    events: [],
  });
  // const [transactionData, setTransactionData] = React.useState({
  //   name: "",
  //   points: 0,
  //   balance: 0,
  // });

  useEffect(() => {
    if (isOpen) {
      setIsSignedUp(false);
      setIsViewingBalance(false);
      setIsViewingEarnPointsOptions(false);
      setIsViewingRedeemOptions(false);
    }
    handleSignUp();
  }, [isOpen]);

  const handleSignUp = () => {
    if (!isSignedUp) {
      getCustomerWallet();
      setIsSignedUp(true);
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
    setIsViewingBalance(true);
  };
  const handleCloseBalance = () => {
    setIsViewingBalance(false);
  };
  const handleRedeemPoints = () => {
    setIsViewingRedeemOptions(true);
  };
  const handleCloseRedeemOptions = () => {
    setIsViewingRedeemOptions(false);
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full bg-orange-300"
        onClick={() => setIsOpen(true)}
      >
        <GiftIcon className="h-6 w-6 text-white" />
      </Button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-sm rounded-lg bg-white">
            <Button
              className="absolute right-4 top-4 !bg-transparent focus:outline-none focus:ring-0 "
              onClick={() => setIsOpen(false)}
            >
              <XIcon className="h-6 w-6 text-gray-500" />
            </Button>
            {!isSignedUp ? (
              <div className="flex flex-col items-center justify-center">
                <div className="rounded-xl bg-orange-300">
                  <div className="h-32 rounded-t-lg bg-orange-300 p-4 text-white"></div>

                  <div className="rounded-t-xl bg-white p-4">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-center text-sm text-black">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Placeat sequi minima sunt, aspernatur aperiam
                        dignissimos necessitatibus
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
                  <div className="rounded-b-lg bg-gray-100 p-4 text-center">
                    <p className="text-sm text-gray-500">
                      We reward with{" "}
                      <span className="text-pink-500">Loyal X</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="h-32 rounded-t-lg bg-orange-300 p-4 text-white">
                  <h2 className="text-xl font-bold text-black">
                    Welcome {userData.name}
                  </h2>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-black">
                    Your points: {userData.points}{" "}
                    <InfoIcon className="inline h-4 w-4" />
                  </h3>
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
                    <Button
                      variant="outline"
                      className="flex h-12 w-full items-center justify-between py-[16px]"
                      onClick={() => setIsViewingEarnPointsOptions(true)}
                    >
                      <span className="flex items-center space-x-2 text-black">
                        <TicketIcon className="h-5 w-5 text-[#d3c39b]" />
                        <span>Earn points</span>
                      </span>
                      <ChevronRightIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="rounded-b-lg bg-gray-100 p-4 text-center">
                  <p className="text-sm text-gray-500">
                    We reward with{" "}
                    <span className="text-pink-500">Loyal X</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {isViewingBalance && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-sm rounded-lg bg-white">
            <button
              className="absolute right-4 top-4 !bg-transparent focus:outline-none focus:ring-0"
              onClick={handleCloseBalance}
            >
              <XIcon className="h-6 w-6 text-gray-500" />
            </button>
            <div className="h-32 rounded-t-lg bg-orange-300 p-4 text-white">
              <h2 className="text-xl font-bold text-black">My Balance</h2>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black">
                Your balance: ${userData.balance}
              </h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">Deposit</p>
                    <p className="text-sm text-muted-foreground">
                      June 15, 2023
                    </p>
                  </div>
                  <p className="text-lg font-semibold">+$500</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">Withdrawal</p>
                    <p className="text-sm text-muted-foreground">
                      June 10, 2023
                    </p>
                  </div>
                  <p className="text-lg font-semibold">-$300</p>
                </div>
                <div className="rounded-b-lg bg-gray-100 p-4 text-center">
                  <Button
                    variant="outline"
                    className="w-full text-black"
                    onClick={handleCloseBalance}
                  >
                    Go Back
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-b-lg bg-gray-100 p-4 text-center">
              <p className="text-sm text-gray-500">
                We reward with <span className="text-pink-500">Loyal X</span>
              </p>
            </div>
          </div>
        </div>
      )}
      {isViewingEarnPointsOptions && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-sm rounded-lg bg-white">
            <button
              className="absolute right-4 top-4 !bg-transparent focus:outline-none focus:ring-0"
              onClick={() => setIsViewingEarnPointsOptions(false)}
            >
              <XIcon className="h-6 w-6 text-gray-500" />
            </button>
            <div className="h-32 rounded-t-lg bg-orange-300 p-4 text-white">
              <h2 className="text-xl font-bold text-black">Earn Points</h2>
            </div>
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
                onClick={() => setIsViewingEarnPointsOptions(false)}
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      )}
      {isViewingRedeemOptions && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-sm rounded-lg bg-white">
            <button
              className="absolute right-4 top-4 !bg-transparent focus:outline-none focus:ring-0"
              onClick={handleCloseRedeemOptions}
            >
              <XIcon className="h-6 w-6 text-gray-500" />
            </button>
            <div className="h-32 rounded-t-lg bg-orange-300 p-4 text-white">
              <h2 className="text-xl font-bold text-black">Earn Points</h2>
            </div>
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
                onClick={handleCloseRedeemOptions}
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
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
