import LoginCard from "../../components/auth/login/Login";

export default function Login() {
  return (
    <main className=" flex-1  bg-black text-white flex flex-col px-2">
      {/* Main Content */}
      <main className="flex items-center justify-center p-3">
        <div className="max-w-7xl w-full overflow-y-auto">
          <LoginCard />
        </div>
      </main>

    </main>
  );
}