import { useEffect } from "react"; 
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
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

// Custom validation for file input
const fileValidation = (value: File | null) => {
  if (!value) return false; // No file selected
  const allowedExtensions = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return allowedExtensions.includes(value.type);
};

const formSchema = z.object({
  impact: z.string().min(50, "Impact must be at least 50 characters long"),
  resources: z.string().min(50, "Resources must be at least 50 characters long"),
  proposal_details: z.string().min(50, "Proposal details must be at least 50 characters long"),
  pdf_file: z.instanceof(File).refine(fileValidation, {
    message: "File must be a PDF or DOC/DOCX",
  }),
});

// Define the inferred type from the form schema
type FormValues = z.infer<typeof formSchema>;

function SubmitProposalForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      impact: "",
      resources: "",
      proposal_details: "",
      pdf_file: undefined,
    },
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Load saved form data from local storage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('proposalFormData');
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [form]);

  // Function to safely append form values to FormData
  function appendFormData(formData: FormData, values: FormValues) {
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    appendFormData(formData, values);

    // Clear saved data on successful submission
    localStorage.removeItem('proposalFormData');

    const token1 = localStorage.getItem('token');
    const token2 = localStorage.getItem('refreshToken');
    const token = token1 ? token1 : token2;

    // Send form data to the backend
    fetch('http://localhost:3000/proposals', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        form.reset(); // Reset the form if needed
        navigate("/new-proposal/profile"); // Redirect the user to the next page
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Save form data to local storage on any change
  const saveFormData = (values: FormValues) => {
    localStorage.setItem('proposalFormData', JSON.stringify(values));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        onChange={() => saveFormData(form.getValues())} // Save data on any change
      >
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
        <div>
          Placeholder to collect file here
        </div>
        {/* <FormField
          control={form.control}
          name="pdf_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload PDF/DOC File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const files = e.target.files;
                    const file = files ? files[0] : null;
                    field.onChange(file); // Pass file directly to field
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button onClick={()=>{navigate('/new-proposal/profile')}}>Save and Next</Button>
      </form>
    </Form>
  );
}

export default SubmitProposalForm;
