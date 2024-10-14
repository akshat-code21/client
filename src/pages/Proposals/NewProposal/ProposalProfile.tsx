import PageHeading from "@/components/Common/PageHeading";
import SubmitProfileDetailForm from "@/components/Forms/Proposals/SubmitProfileDetailForm";

function ProposalProfile() {
  return (
    <div>
      <PageHeading
        title="Your Proposal Profile"
        description="Fill in the details of your proposal "
      />
      <div className="mt-8">
        <SubmitProfileDetailForm />
      </div>
    </div>
  );
}

export default ProposalProfile;
