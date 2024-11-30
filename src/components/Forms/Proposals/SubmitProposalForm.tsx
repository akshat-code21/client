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
import { useNavigate } from "react-router-dom";

// Utility to refresh the token
async function refreshTokenFunction(refreshToken: string): Promise<string> {
  const response = await fetch("http://localhost:3000/auth/refreshToken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to refresh token: ${errorMessage}`);
  }

  const { token } = await response.json();
  localStorage.setItem("token", token); // Store the new token
  return token;
}

// Utility to check if a token is expired
const isTokenExpired = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

// Custom file validation function
const fileValidation = (value: File | null) => {
  if (!value) return false; // File is required
  const allowedExtensions = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return allowedExtensions.includes(value.type);
};

// Zod schema for form validation
const formSchema = z.object({
  impact: z.string().min(50, "Impact must be at least 50 characters long"),
  resources: z.string().min(50, "Resources must be at least 50 characters long"),
  proposal_details: z
    .string()
    .min(50, "Proposal details must be at least 50 characters long"),
  pdf_file: z
    .instanceof(File)
    .refine(fileValidation, { message: "File must be a PDF or DOC/DOCX" }),
});

// Form data type inferred from schema
type FormValues = z.infer<typeof formSchema>;

function SubmitProposalForm() {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      impact: "",
      resources: "",
      proposal_details: "",
      pdf_file: undefined,
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem("proposalFormData");
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [form]);

  // Append form values to FormData safely
  const appendFormData = (formData: FormData, values: FormValues) => {
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as Blob | string);
    });
  };

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    appendFormData(formData, values);

    let token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      alert("Authentication tokens are missing. Please log in again.");
      navigate("/auth/login");
      return;
    }

    if (isTokenExpired(token)) {
      try {
        token = await refreshTokenFunction(refreshToken);
      } catch (error) {
        console.error("Token refresh failed:", error);
        alert("Session expired. Please log in again.");
        navigate("/auth/login");
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:3000/proposals", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to submit the proposal");
      }

      const data = await response.json();
      alert("Proposal submitted successfully!");
      form.reset(); // Clear the form
      localStorage.removeItem("proposalFormData"); // Clear saved data
      navigate("/new-proposal/profile"); // Redirect
    } catch (error) {
      console.error("Proposal submission error:", error);
      alert("Failed to submit proposal. Please try again.");
    }
  };

  // Save form data on change
  const saveFormData = (values: FormValues) => {
    localStorage.setItem("proposalFormData", JSON.stringify(values));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        onChange={() => saveFormData(form.getValues())}
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
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save and Next</Button>
      </form>
    </Form>
  );
}

export default SubmitProposalForm;
