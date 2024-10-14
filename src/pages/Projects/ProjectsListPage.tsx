// import DemoPage from "./ProjectsTable";
import PageHeading from "@/components/Common/PageHeading";
import DemoPage from "../ProjectsTable"; // Import the correct component
// import { useBhasiniStore } from "@/store/store";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Link } from "react-router-dom";

const ProjectListPage = () => {
  // ...
  // const { user } = useBhasiniStore();

  return (
    <>
      <PageHeading
        title="Projects"
        description="Choose the Project you are Interested in!"
      >
        {/* {user?.type === "admin" && (
          <Link to="" className={buttonVariants({ variant: "default" })}>
            Create a new Project
          </Link>
        )} */}
      </PageHeading>
      <DemoPage />
    </>
  );
};

export default ProjectListPage;
