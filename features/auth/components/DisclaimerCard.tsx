import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button"
export default function DisclaimerCard() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col rounded-md py-4 text-white sm:px-1 md:px-2">
      <h1 className="mb-4 text-center text-lg font-bold sm:text-xl md:text-2xl">
        MGame
      </h1>
      <div className="flex flex-col gap-1 text-sm leading-6 sm:text-base">
        <p>By tapping "Agree", you confirm that:</p>
        <p>1. I am over 21 years of age.</p>
        <p>2. You are not a government official or employee, a member of the armed forces, or connected with any government agency.</p>
        <p>3. You are not a holder of a Gaming Employment License (GEL).</p>
        <p>4. You are not listed in PAGCOR's National Database of Restricted Persons (NDRP). If you are found ineligible, your account, funds, and credits may be forfeited in accordance with applicable regulations.</p>
        <p>5. You will not play in public places.</p>
        <p>5. Refrain from playing in public.</p>
        <p>
          6. You have read and agree to MGame.ph's {" "}
          <span className="font-semibold text-red-600">
            Privacy Policy
          </span>{" "}
          and{" "}
          <span className="font-semibold text-red-600">
            Terms of Use.
          </span>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <h2 className="text-center text-lg font-bold text-red-600 sm:text-xl">
          NOTICE TO PLAYERS
        </h2>

        <p className="text-justify text-xs leading-5 text-gray-200 sm:text-sm sm:leading-6 md:text-base">
          Only qualified individuals may register and play on MGame.ph. Players who are found ineligible may have their accounts, funds, and credits forfeited in accordance with applicable regulations.
          Please play responsibly and avoid playing in public places.{" "}
          <span className="font-semibold italic text-red-600">
            By tapping "Agree", you confirm that you meet the eligibility requirements to use MGame.ph.
          </span>
        </p>
      </div>
      <Button onClick={() => navigate("/login")}>
         AGREE
      </Button>
    </div>
  );
}