import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { useBhasiniStore } from "@/store/store";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Link, useParams } from "react-router-dom";

import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

function ProposalPage() {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const { toast } = useToast();

  const { user } = useBhasiniStore();

  const handleAlerts = (message: string) => {
    toast({
      title: message,
      // description: "Friday, February 10, 2023 at 5:57 PM",
    });
    console.log("Request Changes");
  };

  return (
    <>
      <main className="flex flex-col px-[60px] py-8 gap-8">
        <div className="flex justify-between">
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl font-semibold">Proposal Page</h1>
            <p>Proposal ID: {id}</p>
          </div>
          {user?.type !== "admin" ? (
            <Link
              to={`/new-proposal/${id}/new`}
              className={buttonVariants({
                variant: "default",
                className: "bg-bhasiniBlue",
              })}
            >
              Start Contribution
            </Link>
          ) : (
            <>
              <div className="flex gap-4 items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green-500">Approve</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Approve Proposal</DialogTitle>
                      <DialogDescription>
                        are you sure you want to approve this proposal?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose>
                        <Button
                          onClick={() => handleAlerts("Proposal Approved")}
                          className="bg-green-500"
                        >
                          Approve
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-red-500">Reject</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reject Proposal</DialogTitle>
                      <DialogDescription>
                        are you sure you want to reject this proposal?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose>
                        <Button
                          onClick={() => handleAlerts("Proposal Rejected")}
                          className="bg-red-500"
                        >
                          Reject
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Request Changes</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Changes</DialogTitle>
                      {/* <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription> */}
                    </DialogHeader>
                    <Textarea
                      placeholder="Describe the changes"
                      className="mt-4"
                    />
                    <DialogFooter>
                      <DialogClose>
                        <Button
                          onClick={() =>
                            handleAlerts("Request Changes Submitted")
                          }
                          type="submit"
                        >
                          Submit
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </div>
        <div>
          <span>
            An operating system for a wide range of devices Android is an
            operating system and software stack created for an array of devices
            with different form factors, including phones, tablets, wearables,
            TVs, automobiles, and connected devices. The primary purposes of
            Android are to create an open platform available for carriers, OEMs,
            and developers to make their ideas a reality and to provide a
            successful, real-world product that improves the mobile experience .
            How Google uses Android Android powers the Google Pixel and is used
            by many Googlers to quickly bootstrap mobile and asfsfdnsldgdf
          </span>
        </div>

        <div className="flex gap-4 flex-col">
          <h2 className="text-4xl font-semibold">Skills & Expertise</h2>
          <div className="flex gap-2">
            {["React", "NodeJs", "NextJs", "Javascript"].map((skill) => (
              <Badge className="bg-[#F1F1F1] text-[#676767] px-4 font-normal tracking-wider text-lg">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">Resources</h2>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            laoreet ex tempus ligula interdum dapibus. Donec accumsan elementum
            neque, nec venenatis risus molestie in. Curabitur accumsan suscipit
            aliquet. Fusce aliquet placerat euismod. Pellentesque nec urna ac
            velit euismod volutpat id in dui. Fusce auctor ultricies sapien et
            ullamcorper. Aenean gravida quis ex non dapibus.
          </span>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            pretium ex at erat accumsan aliquam. Suspendisse sagittis mi quis
            quam commodo, quis maximus nulla varius. In a diam commodo, interdum
            diam non, blandit ligula. Mauris malesuada est non eros porta, in
            eleifend orci feugiat.
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">Activity on this Project</h2>
          <div className="flex gap-2 flex-col">
            <div className="flex gap-2">
              <span className="font-bold">Proposals :</span>{" "}
              <span>Less than 10</span>
            </div>
            <div className="flex gap-2">
              <span className="font-bold">MoU sent :</span> <span>2</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProposalPage;
