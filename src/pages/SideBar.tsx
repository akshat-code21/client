import { Eye, Building, PaperclipIcon, User } from "lucide-react";
// import { Button } from "../components/ui/button";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const SideBarLink = [
  {
    title: "Overview",
    icon: Eye,
    path: "overview",
  },
  {
    title: "Projects",
    icon: Building,
    path: "projects",
  },
  {
    title: "Proposals",
    icon: PaperclipIcon,
    path: "proposals",
  },
  {
    title: "Profile",
    icon: User,
    path: "profile",
  },
];

const SideBar = () => {
  return (
    <div className="h-screen flex flex-row w-fit">
      <div className="flex flex-col h-16">
        <div className="flex flex-col gap-2 py-4 px-4 max-w-full">
          {SideBarLink.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
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
            to={"/dashboard/projects/new"}
            className={buttonVariants({
              variant: "default",
              className: "px-6",
            })}
          >
            Submit a new Project Idea
          </Link>
        </div>
      </div>
      <div className="border-r border-gray-200"></div>
    </div>
  );
};

export default SideBar;