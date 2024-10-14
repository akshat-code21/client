import PageHeading from "@/components/Common/PageHeading";
import SubmitProposalForm from "@/components/Forms/Proposals/SubmitProposalForm";

function ProposalDetails() {
  return (
    <div>
      <PageHeading
        title="Proposal Details"
        description="Fill in the details of your proposal "
      />
      <div className="mt-3">
        <SubmitProposalForm />
      </div>
    </div>
  );
}

export default ProposalDetails;
