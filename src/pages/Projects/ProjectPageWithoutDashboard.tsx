import { Outlet, redirect } from "react-router-dom";

import { useBhasiniStore } from "@/store/store";
import LandingPageHeader from "@/components/Headers/LandingPageHeader";

const ProjectPageWithoutDashboard = () => {
  const { user } = useBhasiniStore();

  if (!user) {
    console.log("User not found");
    redirect("/auth/login");
  }

  return (
    <main className="max-h-screen max-w-screen">
      <LandingPageHeader />
      <div className="h-full w-full flex flex-col p-8 gap-8 overflow-hidden overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default ProjectPageWithoutDashboard;
