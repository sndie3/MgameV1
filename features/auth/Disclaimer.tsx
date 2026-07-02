import DisclaimerCard from "../../components/auth/disclaimer/DisclaimerCard";


export default function Disclaimer() {
  return (
    <main className=" bg-black flex flex-col px-2">
      {/* Main Content */}
      <main className="flex items-center justify-center p-3">
        <div className="max-w-7xl w-full">
          <DisclaimerCard />
        </div>
      </main>

    </main>
  );
}