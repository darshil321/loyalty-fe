import { Button } from "../ui/button";
import { ViewEnum } from "../../lib/constants";
import { ChevronRightIcon, InfoIcon, TicketIcon, WalletIcon } from "../ui/svg";

const InitialView = ({ userData, onNavigate, handleViewBalance }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-black">
        Your points: {userData.points} <InfoIcon className="inline h-4 w-4" />
      </h3>
      <div className="mt-4 space-y-4">
        <Button
          variant="outline"
          className="flex h-12 w-full items-center justify-between py-[16px]"
          onClick={() => {
            onNavigate(ViewEnum.BALANCE);
            handleViewBalance();
          }}
        >
          <span className="flex items-center space-x-2 text-black">
            <WalletIcon className="h-5 w-5 text-[#CCD5AE]" />
            <span>My Balance</span>
          </span>
          <ChevronRightIcon className="h-5 w-5 text-[#CCD5AE]" />
        </Button>
        <Button
          variant="outline"
          className="flex h-12 w-full items-center justify-between py-[16px]"
          onClick={() => onNavigate(ViewEnum.REDEEM_POINTS_OPTIONS)}
        >
          <span className="flex items-center space-x-2 text-black">
            <TicketIcon className="h-5 w-5 text-[#CCD5AE]" />
            <span>Redeem points</span>
          </span>
          <ChevronRightIcon className="h-5 w-5 text-[#CCD5AE]" />
        </Button>
        <Button
          variant="outline"
          onClick={() => onNavigate(ViewEnum.EARN_POINTS)}
          className="flex h-12 w-full items-center justify-between py-[16px]"
        >
          <span className="flex items-center space-x-2 text-black">
            <TicketIcon className="h-5 w-5 text-[#CCD5AE]" />
            <span>Earn points</span>
          </span>
          <ChevronRightIcon className="h-5 w-5 text-[#CCD5AE]" />
        </Button>
      </div>
    </div>
  );
};

export default InitialView;
