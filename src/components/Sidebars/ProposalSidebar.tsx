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

const ProposalSidebar = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/dashboard/projects/" + id);
  };

  const getLinkWithId = (path: string) => {
    return `/new-proposal/${id}/${path}`;
  };

  return (
    <div className="h-screen flex flex-row w-fit">
      <div className="flex flex-col h-16">
        <div className="flex flex-col gap-2 py-4 px-4 max-w-full">
          <Button
            onClick={goBack}
            className="flex justify-start gap-2 rounded-lg text-gray-600 hover:bg-bhasiniBlue hover:text-white bg-transparent items-start px-4 py-2"
          >
            <MoveLeft className="h-5 w-5" /> <span>Save and Exit</span>
          </Button>
          {SideBarLink.map((item, index) => (
            <NavLink
              key={index}
              to={getLinkWithId(item.path)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-lg text-gray-600 hover:text-violet-700 px-4 py-2",
                  isActive ? " bg-gray-200 text-gray-900" : null
                )
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
            to="/dashboard/projects/new"
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
