import { Eye, MoveLeft, FileText, UserPlus } from "lucide-react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

const SideBarLink = [
  {
    title: "Proposal Details",
    icon: FileText,
    path: "new",
  },
  {
    title: "Personal Details",
    icon: UserPlus,
    path: "profile",
  },
  {
    title: "Review",
    icon: Eye,
    path: "review",
  },
];

const ProposalSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get current path

  const goBack = () => {
    localStorage.removeItem('proposalFormData'); // Clear saved data when exiting
    navigate("/dashboard/proposals");
  };

  const getLinkWithId = (path: string) => {
    return `/new-proposal/${path}`;
  };

  return (
    <div className="h-screen flex flex-row w-fit">
      <div className="flex flex-col h-16">
        <div className="flex flex-col gap-2 py-4 px-4 max-w-full">
          <Button
            onClick={goBack}
            className="flex justify-start gap-2 rounded-lg text-gray-600 hover:bg-bhasiniBlue hover:text-white bg-transparent items-start px-4 py-2"
          >
            <MoveLeft className="h-5 w-5" /> <span>Exit</span>
          </Button>
          {SideBarLink.map((item, index) => (
            <NavLink
              key={index}
              to={getLinkWithId(item.path)}
              className={({ isActive }) =>
                isActive || (location.pathname === `/dashboard/proposals/` && item.path === 'new')
                  ? "flex items-center gap-2 rounded-lg text-gray-600 hover:text-violet-700 px-4 py-2 bg-gray-200 text-gray-900"
                  : "flex items-center gap-2 rounded-lg text-gray-600 hover:text-violet-700 px-4 py-2"
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
        <div className="border-b border-gray-300 mt-3"></div>
        <div className="px-4 py-4">
          <Link
            to={`/new-proposal/new/`}
            className={buttonVariants({
              variant: "default",
              className: "px-6",
            })}
          >
            Submit a new Proposal
          </Link>
        </div>
      </div>
      <div className="border-r border-gray-200"></div>
    </div>
  );
};

export default ProposalSidebar;
