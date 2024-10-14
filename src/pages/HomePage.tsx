import bhasiniLogo from "../assets/govBhasini.svg";
import bhasiniMainLogo from "../assets/bhasiniLogo.svg";
import heroImage from "../assets/HeroImage.svg";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/variants";
import { Badge } from "@/components/ui/badge";
import LandingPageHeader from "@/components/Headers/LandingPageHeader";

interface FooterLinkProps {
  to: string;
  text: string;
}

interface FooterProps {
  title: string;
  navLinks: FooterLinkProps[];
}

enum LEVEL {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  skills: string[];
  proposals: number;
  level: LEVEL;
}

const projectCards: ProjectCardProps[] = [
  {
    title: "Project 1",
    description: "Project Description",
    image: "Project Image",
    skills: ["NextJS", "Node"],
    proposals: 10,
    level: LEVEL.BEGINNER,
  },
  {
    title: "Project 2",
    description: "Project Description",
    image: "Project Image",
    skills: ["Javascript", "Python"],
    proposals: 10,
    level: LEVEL.INTERMEDIATE,
  },
  {
    title: "Project 3",
    description: "Project Description",
    image: "Project Image",
    skills: ["Node", "React"],
    proposals: 10,
    level: LEVEL.ADVANCED,
  },
  {
    title: "Project 4",
    description: "Project Description",
    image: "Project Image",
    skills: ["NextJS", "Node"],
    proposals: 10,
    level: LEVEL.BEGINNER,
  },
  {
    title: "Project 5",
    description: "Project Description",
    image: "Project Image",
    skills: ["Javascript", "Python"],
    proposals: 10,
    level: LEVEL.INTERMEDIATE,
  },
  {
    title: "Project 6",
    description: "Project Description",
    image: "Project Image",
    skills: ["Node", "React"],
    proposals: 10,
    level: LEVEL.ADVANCED,
  },
];

const footerLinks: FooterProps[] = [
  {
    title: "About",
    navLinks: [
      {
        to: "/",
        text: "About us",
      },
      {
        to: "/",
        text: "Career",
      },
      {
        to: "/",
        text: "Terms & Conditions",
      },
      {
        to: "/",
        text: "Policy",
      },
    ],
  },
  {
    title: "Prayog",
    navLinks: [
      {
        to: "/",
        text: "Chitraanuvaad",
      },
      {
        to: "/",
        text: "Anuvaad",
      },
      {
        to: "/",
        text: "Vaanianuvaad",
      },
      {
        to: "/",
        text: "Lekhaanuvaad",
      },
    ],
  },
  {
    title: "Sahyogi",
    navLinks: [
      {
        to: "/",
        text: "Translation service provider",
      },
      {
        to: "/",
        text: "Start up",
      },
      {
        to: "/",
        text: "State gov",
      },
      {
        to: "/",
        text: "Mitra",
      },
      {
        to: "/",
        text: "Udayat",
      },
    ],
  },
  {
    title: "Sanchalak",
    navLinks: [
      {
        to: "/",
        text: "ULCA",
      },
      {
        to: "/",
        text: "NHLT",
      },
    ],
  },
  {
    title: "Other",
    navLinks: [
      {
        to: "/",
        text: "Pravakta",
      },
      {
        to: "/",
        text: "Tenders",
      },
      {
        to: "/",
        text: "Ecosystem",
      },
    ],
  },
];

function HomePage() {
  return (
    <main className="flex flex-col gap-[30px] lg:gap-[60px]">
      <LandingPageHeader />

      <div className="px-4 lg:px-[60px] w-full ">
        <div className="bg-[#FFF2E9] shadow-sm gap-8 lg:gap-[200px] flex lg:flex-row flex-col-reverse rounded-lg  w-full p-4  lg:p-[54px]">
          <div className="flex flex-col w-full gap-2 items-start">
            <span className="text-[2rem] lg:text-[44px] font-semibold leading-[110%]">
              Bhasini <br /> <span className="text-bhasiniBlue">Student</span>{" "}
              <span className="text-[#FD7F23]">Contribution</span> <br /> Portal
            </span>
            <span>
              ULCA is a standard API and open scalable data platform (supporting
              various types of datasets) for Indian language datasets and
              models.
            </span>

            <Link
              to="/dashboard"
              className={buttonVariants({
                variant: "default",
                className: "bg-bhasiniBlue",
              })}
            >
              Let's Start{" "}
            </Link>
          </div>
          <div className="w-full">
            <img src={heroImage} alt="Hero Image" />
          </div>
        </div>
      </div>

      <div className=" px-4 text-center flex flex-col items-center justify-center gap-6">
        <span className="text-[2rem] font-semibold">
          Breaking Language Barriers Across India
        </span>
        <span>
          Speak Your Language, All of India Understands! Contribute and create
          impact
        </span>
        <span className="font-bold">Start contributing now!</span>

        <div className="flex gap-8 lg:gap-[60px] items-center">
          <Button className="bg-bhasiniBlue">Individual Contributor</Button>
          <Button className="bg-[#FD7F23]">Institution</Button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-wrap  lg:flex-nowrap gap-8  justify-center lg:gap-[60px] items-center w-full bg-gradient-to-r from-[#FEA96C] to-[#FD7F23] p-8 px-4 lg:px-[60px]">
          {["Ongoing Projects", "Received Proposals"].map((item) => (
            <>
              <Card key={item} className="max-w-[400px] w-full">
                <CardHeader>
                  <CardTitle className="border-b-[1px] pb-4">{item}</CardTitle>
                  {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <h2 className="text-4xl font-bold text-center">100+</h2>
                </CardContent>
                {/* <CardFooter>
                <p>Card Footer</p>
              </CardFooter> */}
              </Card>
            </>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#4677F5] to-[#0033B4] px-4  lg:px-[60px] flex-col flex items-center justify-center py-8 w-full gap-8">
          <h2 className="pb-4 border-b-[1px] text-4xl text-white">
            Available Projects
          </h2>

          <div className="grid w-full lg:grid-cols-3 gap-8 ">
            {projectCards.map((item, index) => (
              <>
                <Card key={item.title} className="w-full lg:min-w-[400px] ">
                  <CardHeader>
                    <CardTitle className="flex gap-4 items-center justify-between">
                      <div>{item.title}</div>
                      {/* <Badge variant="outline">{item.proposals}+</Badge> */}
                      <Badge variant="outline">{item.level}</Badge>
                    </CardTitle>

                    {/* <CardDescription>Card Description</CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <span>{item.description}</span>
                  </CardContent>
                  <CardFooter className="flex gap-4 items-start flex-col">
                    <div className="flex gap-2">
                      {item.skills.map((skill) => (
                        <Badge variant="outline">{skill}</Badge>
                      ))}
                    </div>
                    {/* <span>Propsals : {item.proposals}</span> */}
                    <Link
                      to={`/projects/` + index}
                      className={buttonVariants({
                        variant: "default",
                        className: "w-full bg-bhasiniBlue",
                      })}
                    >
                      View Project
                    </Link>
                  </CardFooter>
                </Card>
              </>
            ))}
          </div>

          <Link
            className={buttonVariants({
              variant: "default",
              className:
                "px-8 text-lg bg-gradient-to-r from-[#FEA96C] to-[#FD7F23]",
            })}
            to="/projects"
          >
            View All Projects
          </Link>
        </div>
      </div>

      <footer>
        <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row px-4  lg:px-[60px] justify-between">
          {footerLinks.map((footerLink) => (
            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg">{footerLink.title}</span>
              {footerLink.navLinks.map((navLink) => (
                <NavLink to={navLink.to}>{navLink.text}</NavLink>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-lg">Contact Us</span>
            <div className="pb-2 border-b-[1px] flex flex-col">
              <span>Email</span>
              <span className="text-[#4D4D4D]">
                ceo-dibd@digitalindia.gov.in
              </span>
            </div>
            <div className="pb-2 border-b-[1px] flex flex-col">
              <span>Phone</span>
              <span className="text-[#4D4D4D]">011-24301361</span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 pb-4 ">
          <div className="flex px-4 lg:px-[60px] justify-between items-center py-4 pb-2 border-b-[1px]">
            <img
              src={bhasiniLogo}
              className="max-w-[30%]"
              alt="Bhasini Goverment Mark"
            />
            <img
              src={bhasiniMainLogo}
              className="max-w-[30%]"
              alt="Bhasini Goverment Mark"
            />
          </div>

          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <span className="text-sm text-[#89939E]">
              Designed, Developed & Hosted by
            </span>
            <span>Digital India Bhashini Division (DIBD)</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;
