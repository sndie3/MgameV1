import DisclaimerCard from "../../components/auth/disclaimer/DisclaimerCard";
import LoginCard from "../../components/auth/login/login";
import Footer from "../../components/common/Footer";

export default function Login() {
  return (
    <main className=" bg-black flex flex-col px-2">
      {/* Main Content */}
      <main className="flex items-center justify-center p-3">
        <div className="max-w-7xl w-full">
          <DisclaimerCard />
          {/* <LoginCard /> */}
        </div>
      </main>

    </main>
  );
}