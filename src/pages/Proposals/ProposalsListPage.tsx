// import DemoPage from "./ProjectsTable";
import PageHeading from "@/components/Common/PageHeading"; // Import the correct component
import ProposalDemoPage from "../Proposals/ProposalDemoPage";
const ProposalsListPage = () => {
  // ...

  return (
    <>
      <PageHeading
        title="Proposals"
        description="All the proposals you have submitted!"
      />
      <ProposalDemoPage></ProposalDemoPage>
    </>
  );
};

export default ProposalsListPage;
