// import DemoPage from "./ProjectsTable";
import PageHeading from "@/components/Common/PageHeading";
import DemoPage from "../ProjectsTable"; // Import the correct component

const ProposalsListPage = () => {
  // ...

  return (
    <>
      <PageHeading
        title="Proposals"
        description="All the proposals you have submitted!"
      />
      <DemoPage />
    </>
  );
};

export default ProposalsListPage;
