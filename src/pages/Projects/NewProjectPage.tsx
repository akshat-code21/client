import PageHeading from "@/components/Common/PageHeading";
import { CreateNewProjectForm } from "../../components/Forms/CreateNewProjectForm";

const NewProjectPage = () => {
  return (
    <>
      <PageHeading
        title="Create Project"
        description="Create a project for contributors"
      />
      <div className="mt-3">
        <CreateNewProjectForm />
      </div>
    </>
  );
};

export default NewProjectPage;
