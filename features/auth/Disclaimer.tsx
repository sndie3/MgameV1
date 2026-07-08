import DisclaimerCard from "./components/DisclaimerCard";


export default function Disclaimer() {
  return (
    <div className=" flex-1 flex flex-col px-2">
      {/* Main Content */}
      <main className="flex items-center justify-center p-3">
        <div className="max-w-7xl w-full">
          <DisclaimerCard />
        </div>
      </main>

    </div>
  );
}