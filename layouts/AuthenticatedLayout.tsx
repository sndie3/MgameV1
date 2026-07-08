import { Outlet } from "react-router-dom";


export default function AuthenticatedLayout() {
  // This Layout is used for authenticated routes, such as the dashboard and other protected pages.

  // not yet implemented: if user is logged in, redirect to dashboard. If not, redirect to login page.
  return (
     <section className="min-h-dvh flex w-full bg-[var(--background-color)]">
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />  
      </main>
    </section>
  );
}
