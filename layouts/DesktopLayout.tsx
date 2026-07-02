import { Outlet} from "react-router-dom";
import Footer from "../components/common/Footer";

export default function AppLayout() {
  //const location = useLocation();
  //const isAuthPage = location.pathname === '/register' || location.pathname === '/reset';

  return (
    <section className="min-h-dvh flex w-full bg-black">
      <main className="flex flex-1 flex-col overflow-y-auto">
        {/* Page Content */}
        <Outlet />

        {/* Footer - not shown on register/reset pages */}
        <div className="px-5">
            <Footer />
          </div>
        {/* {!isAuthPage && (
          
        )} */}
      </main>
    </section>
  );
}