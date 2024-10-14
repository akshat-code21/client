import PageHeading from "@/components/Common/PageHeading";
import AdminProfileForm from "@/components/Forms/Profile/AdminProfile";
import SubmitProfileDetailForm from "@/components/Forms/Proposals/SubmitProfileDetailForm";
import { useBhasiniStore } from "@/store/store";

export default function Profile() {
  const { user } = useBhasiniStore();
  return (
    <div>
      <PageHeading title="Profile" description="Your profile details" />

      <div className="mt-8">
        {user?.type === "admin" ? (
          <AdminProfileForm />
        ) : (
          <SubmitProfileDetailForm />
        )}
      </div>
    </div>
  );
}
