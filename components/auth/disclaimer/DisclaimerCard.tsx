import Footer from "../../common/Footer";

export default function DisclaimerCard() {
  return (

    <div className="text-white flex-col rounded-md font-sans">
      <h1 className="text-center text-md font-bold ">
        PinoyMGame
      </h1>
      <div className=" text-md  flex flex-col">
        <p>1. I am over 21 years of age</p>
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
          <span className="text-red-600 font-semibold">
            Privacy Policy
          </span>{" "}
          and{" "}
          <span className="text-red-600 font-semibold">
            Terms of Use.
          </span>
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <h2 className=" text-center text-lg font-bold text-red-600">
        NOTICE TO PLAYERS
      </h2>

      <p className="text-sm leading-4 text-gray-200">
        Only eligible persons are allowed to register and play online games.
        Players found ineligible may have their funds and credits forfeited in
        favor of the Government. Please play responsibly. Playing online games
        in open and public places is prohibited.{" "}
        <span className="font-semibold italic text-red-600">
          By clicking "Proceed" you confirm that you are qualified to play.
        </span>
      </p>
      </div>

      <button className="font-bahnschrift mt-5 w-full bg-red-800 py-2 text-lg font-semibold uppercase hover:bg-red-700 transition">
        Proceed
      </button>
    </div>
  );
}