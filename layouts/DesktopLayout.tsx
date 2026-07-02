import { Outlet} from "react-router-dom";
import Footer from "../components/common/Footer";
import {useLocation} from "react-router-dom";
export default function AppLayout() {
  const location = useLocation();
  const isAuthPage =  location.pathname === '/';

  return (
    <section className="min-h-dvh flex w-full bg-black">
      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Page Content */}
        <Outlet />

        {/* Footer - not shown on register/reset pages */}
       
        {!isAuthPage && (
           <div className="px-5">
            <Footer />
          </div>
        )}
      </main>
    </section>
  );
}