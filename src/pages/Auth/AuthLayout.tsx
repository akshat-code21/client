import LandingPageHeader from "@/components/Headers/LandingPageHeader";
import { useBhasiniStore } from "@/store/store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useBhasiniStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if(user.type==="admin")
      {
        navigate('/admin/dashboard');
      }
      else  
        navigate('/dashboard/overview')
    }
  }, [user, navigate]);

  return (
    <div className="flex min-w-screen flex-col items-center  max-h-screen">
      <LandingPageHeader />
      <div className="min-h-[calc(100vh-147px)] w-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
