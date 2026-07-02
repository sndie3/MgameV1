import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

export default function AppLayout() {
  return (
    <section className="min-h-dvh flex w-full bg-black">
      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Page Content */}
        <div className="flex-1 my-2">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="px-5">
          <Footer />
        </div>
      </main>
    </section>
  );
}