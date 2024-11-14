import { Outlet, redirect } from "react-router-dom";
import  NavBar  from "./NavBar";
import  SideBar  from "./SideBar";
import { useBhasiniStore } from "@/store/store";
import AdminSideBar from "./AdminSideBar";

const DashBoard = () => {
  const { user } = useBhasiniStore();

  if (!user) {
    console.log("User not found");
    redirect("/auth/login");
  }
  {user?.type === "admin" && 
    (
    <main className="max-h-screen max-w-screen">
      <NavBar />
      <div className="flex h-[calc(100vh-65px)] w-full overflow-hidden">
        <AdminSideBar />
        <div className="h-full w-full flex flex-col p-8 gap-8 overflow-hidden overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </main>
  )}
  return (
    <main className="max-h-screen max-w-screen">
      <NavBar />
      <div className="flex h-[calc(100vh-65px)] w-full overflow-hidden">
        <SideBar />
        <div className="h-full w-full flex flex-col p-8 gap-8 overflow-hidden overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default DashBoard;
