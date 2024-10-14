// Interfaces
import { NavLinkProps } from "@/lib/interfaces";

// Assets
import bhasiniLogo from "../../assets/govBhasini.svg";
import bhasiniMainLogo from "../../assets/bhasiniLogo.svg";
import { Link, NavLink } from "react-router-dom";

const navLinks: NavLinkProps[] = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/about",
    text: "About Bhasini",
  },
  {
    to: "/prayog",
    text: "Prayog",
  },
  {
    to: "/sahyogi",
    text: "Shayogi",
  },
  {
    to: "/sahyogi",
    text: "Sanchalk",
  },
  {
    to: "/sahyogi",
    text: "Pravakta",
  },
  {
    to: "/",
    text: "Contributor Portal",
  },
];

function LandingPageHeader() {
  return (
    <header className="flex flex-col w-full sticky bg-white top-0">
      <div className="flex px-4 lg:px-[60px] justify-between items-center py-4">
        <Link to={"/"} className="max-w-[30%]">
          <img
            src={bhasiniLogo}
            className="w-full"
            alt="Bhasini Goverment Mark"
          />
        </Link>
        <Link to={"/"} className="max-w-[30%]">
          <img
            src={bhasiniMainLogo}
            className="w-full"
            alt="Bhasini Goverment Mark"
          />
        </Link>
      </div>
      <div className="lg:flex hidden gap-8 h-[55px] items-center px-4 lg:px-[60px] bg-[#F3F3F3]">
        {navLinks.map((navLink) => (
          <>
            <NavLink to={navLink.to} className="text-[#3A3A3A]">
              {navLink.text}
            </NavLink>
          </>
        ))}
      </div>
    </header>
  );
}

export default LandingPageHeader;
