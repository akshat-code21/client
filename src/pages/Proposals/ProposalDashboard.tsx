import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useBhasiniStore } from "@/store/store";
import NavBar from "../NavBar";
import ProposalSidebar from "@/components/Sidebars/ProposalSidebar";

const ProposalDashBoard = () => {
  const { user } = useBhasiniStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("User not found");
      navigate("/auth/login");
    }
  }, [user, navigate]);

  return (
    <main className="max-h-screen max-w-screen">
      <NavBar />
      <div className="flex h-[calc(100vh-65px)] w-full overflow-hidden">
        <ProposalSidebar  />
        <div className="h-full w-full flex flex-col p-8 gap-8 overflow-hidden overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default ProposalDashBoard;
