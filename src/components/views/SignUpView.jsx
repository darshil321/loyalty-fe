import { Button } from "../ui/button";
import { ViewEnum } from "../../lib/constants";
import { ChevronRightIcon, TicketIcon, WalletIcon } from "../ui/svg";

const SignUpView = ({ onSignUp, handleViewChange }) => {
  return (
    <div className="rounded-t-xl bg-white p-4">
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-sm text-black">
          We are thrilled to be able offer a reward program that shows our
          customers what they mean to us! Join today to earn points and redeem
          them at checkout!
        </p>
        <Button
          className="mt-2 bg-orange-300 text-white"
          onClick={() => onSignUp(ViewEnum.INITIAL)}
        >
          Sign Up
        </Button>
      </div>

      <div className="mt-4 space-y-4">
        <Button
          variant="outline"
          className="flex h-12 w-full items-center justify-between py-[16px]"
          onClick={() => handleViewChange(ViewEnum.BALANCE)}
        >
          <span className="flex items-center space-x-2 text-black">
            <WalletIcon className="h-5 w-5 text-[#d3c39b]" />
            <span>My Balance</span>
          </span>
          <ChevronRightIcon className="h-5 w-5 text-green-300" />
        </Button>
        <Button
          variant="outline"
          className="flex h-12 w-full items-center justify-between py-[16px]"
          onClick={() => handleViewChange(ViewEnum.REDEEM_POINTS_OPTIONS)}
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
};

export default SignUpView;
