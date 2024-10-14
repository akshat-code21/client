import { Button } from "@/components/ui/button";
import { useBhasiniStore } from "@/store/store";
import { BellIcon, UserCircle2 } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, logout } = useBhasiniStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("User not found");
      navigate("/auth/login");
    }
  }, [navigate, user]);

  return (
    <nav className="bg-white">
      <div className="max-w px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="object-contain h-8 w-auto"
                src="https://bhashini.gov.in/intro/img/Bhashini_en.png"
                alt="Icon"
              />
            </Link>
          </div>
          {user ? (
            <div className="flex items-center space-x-3">
              <button className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">View Profile</span>
                <UserCircle2 className="h-6 w-6" aria-hidden="true" />
              </button>
              <Button onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Link to={"/auth"}>Login</Link>
          )}
        </div>
      </div>
      <div className="border-b border-gray-200"></div>
    </nav>
  );
};

export default NavBar;