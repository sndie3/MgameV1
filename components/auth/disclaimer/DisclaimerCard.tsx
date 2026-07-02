import { useNavigate } from "react-router-dom";

export default function DisclaimerCard() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col rounded-md py-4 text-white sm:px-1 md:px-2">
      <h1 className="mb-4 text-center text-lg font-bold sm:text-xl md:text-2xl">
        PinoyMGame
      </h1>
      <div className="flex flex-col gap-1 text-sm leading-6 sm:text-base">
        <p>1. I am over 21 years of age.</p>
        <p>
          2. I am not a government official or employee connected with any
          government agency or armed forces.
        </p>
        <p>3. I am not a Gaming Employment License (GEL) holder.</p>
        <p>
          4. I am not included in PAGCOR's National Database of Restricted
          Persons (NDRP).
        </p>
        <p>
          Funds or credits in my account may be forfeited if found ineligible.
        </p>
        <p>5. Refrain from playing in public.</p>
        <p>
          6. I agree to MGAME's{" "}
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
          Only eligible persons are allowed to register and play online games.
          Players found ineligible may have their funds and credits forfeited in
          favor of the Government. Please play responsibly. Playing online
          games in open and public places is prohibited.{" "}
          <span className="font-semibold italic text-red-600">
            By clicking "Proceed" you confirm that you are qualified to play.
          </span>
        </p>
      </div>

      <button
        onClick={() => navigate("/login")}
        className="mt-6 w-full rounded-md bg-red-800 py-3 text-base font-semibold uppercase transition hover:bg-red-700 sm:text-lg"
      >
        Proceed
      </button>
    </div>
  );
}