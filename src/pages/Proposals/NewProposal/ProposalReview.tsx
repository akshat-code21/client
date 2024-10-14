import PageHeading from "@/components/Common/PageHeading";
import SectionHeading from "@/components/Common/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  mobile: z.boolean().default(false).optional(),
});

function ProposalReview() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mobile: true,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    navigate("/dashboard/proposals");
    toast({
      title: "Proposal Submitted",
      variant: "default",
      // description: (
      //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //   </pre>
      // ),
    });
  }

  return (
    <div>
      <PageHeading
        title="Proposal Review"
        description="Review your proposal before submitting it"
      />
      <div className="mt-8 flex flex-col gap-8">
        <Card className="bg-[#F5F5F5]">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">Here will be details</div>
            </CardContent>
          </CardHeader>
        </Card>

        <Card className="bg-[#F5F5F5]">
          <CardHeader>
            <CardTitle>Proposal Details</CardTitle>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">Here will be details</div>
            </CardContent>
          </CardHeader>
        </Card>

        <SectionHeading title="Confirmation">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="flex flex-row bg-[#F5F5F5] items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I, hereby, confirm that all the details filled in the
                        form are correct
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Button className="bg-bhasiniBlue" type="submit">
                Submit Proposal
              </Button>
            </form>
          </Form>
        </SectionHeading>
      </div>
    </div>
  );
}

export default ProposalReview;
