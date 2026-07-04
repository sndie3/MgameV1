import { Outlet } from "react-router-dom";


export default function AuthenticatedLayout() {
  // This Layout is used for authenticated routes, such as the dashboard and other protected pages.

  // if()
  return (
     <section className="min-h-dvh flex w-full bg-black">
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />  
      </main>
    </section>
  );
}
