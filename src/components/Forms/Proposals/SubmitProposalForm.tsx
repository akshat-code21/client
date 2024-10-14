import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Custom validation for file input
const fileValidation = (value) => {
  if (!value) return false;
  const allowedExtensions = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return allowedExtensions.includes(value.type);
};

const formSchema = z.object({
  impact: z.string().min(50),
  resources: z.string().min(50),
  proposal_details: z.string().min(50),
  pdf_file: z.instanceof(File).refine(fileValidation, {
    message: "File must be a PDF or DOC/DOCX",
  }),
});

function SubmitProposalForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      impact: "",
      resources: "",
      proposal_details: "",
      pdf_file: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    // Handle form submission, e.g., send formData to an API
    console.log("Form data submitted: ", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="impact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Impact</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the impact" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="resources"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resources</FormLabel>
              <FormControl>
                <Textarea placeholder="List the resources" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="proposal_details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposal Details</FormLabel>
              <FormControl>
                <Textarea placeholder="Provide proposal details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pdf_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload PDF/DOC File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => field.onChange(e.target.files[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default SubmitProposalForm;
