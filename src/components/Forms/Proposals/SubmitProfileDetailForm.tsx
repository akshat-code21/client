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
import SectionHeading from "@/components/Common/SectionHeading";

// Custom validation for file input
const fileValidation = (value: File) => {
  if (!value) return false;
  const allowedExtensions = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return allowedExtensions.includes(value.type);
};

const formSchema = z.object({
  // Personal Information
  name: z.string().min(1, "Name is required"),
  contact: z.string().min(1, "Contact is required"),
  email: z.string().email("Invalid email address"),
  dob: z.string().min(1, "Date of birth is required"),

  // Document Uploads
  aadhar_card: z.instanceof(File).refine(fileValidation, {
    message: "File must be a PDF or DOC/DOCX",
  }),
  pan_card: z.instanceof(File).refine(fileValidation, {
    message: "File must be a PDF or DOC/DOCX",
  }),

  // Educational Background
  university: z.string().min(1, "University name is required"),
  start_year: z.string().min(1, "Start year is required"),
  end_year: z.string().min(1, "End year is required"),
  degree: z.string().min(1, "Degree is required"),

  // Professional Profiles
  github: z.string().url("Invalid URL"),
  linkedin: z.string().url("Invalid URL"),

  // Occupations and Experience
  occupations: z.string().min(1, "Occupations are required"),
  experience: z.string().min(1, "Experience is required"),

  // Additional Documents
  no_objection_certificate: z.instanceof(File).refine(fileValidation, {
    message: "File must be a PDF or DOC/DOCX",
  }),
  enrollment_certificate: z.instanceof(File).refine(fileValidation, {
    message: "File must be a PDF or DOC/DOCX",
  }),
});

function SubmitProfileDetailForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      dob: "",
      aadhar_card: null,
      pan_card: null,
      university: "",
      start_year: "",
      end_year: "",
      degree: "",
      github: "",
      linkedin: "",
      occupations: "",
      experience: "",
      no_objection_certificate: null,
      enrollment_certificate: null,
    },
  });

  function onSubmit(values: any) {
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
        {/* Personal Information */}
        <div className="space-y-4">
          <SectionHeading title="Personal Information" />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Date of Birth" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aadhar_card"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhar Card</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const files = e.target.files; // Store files in a variable
                        const file = files ? files[0] : null; // Check if files is not null
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pan_card"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pan Card</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        {
                          const files = e.target.files; // Store files in a variable
                          const file = files ? files[0] : null; // Check if files is not null
                          field.onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Educational Background */}
        <div className="space-y-4">
          <SectionHeading title="Educational Background" />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University</FormLabel>
                  <FormControl>
                    <Input placeholder="University" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Year</FormLabel>
                  <FormControl>
                    <Input placeholder="Start Year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Year</FormLabel>
                  <FormControl>
                    <Input placeholder="End Year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input placeholder="Degree" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Professional Profiles */}
        <div className="space-y-4">
          <SectionHeading title="Professional Profiles" />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="GitHub Profile URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="LinkedIn Profile URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Occupations and Experience */}
        <div className="space-y-4">
          <SectionHeading title="Occupations and Experience" />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="occupations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupations</FormLabel>
                  <FormControl>
                    <Input placeholder="Occupations (Enter NA if none)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Input placeholder="Experience (Enter NA if none)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="space-y-4">
          <SectionHeading title="Additional Documents" />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="no_objection_certificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Objection Certificate</FormLabel>
                  <FormControl>
                  <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        {
                          const files = e.target.files; // Store files in a variable
                          const file = files ? files[0] : null; // Check if files is not null
                          field.onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enrollment_certificate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enrollment Certificate</FormLabel>
                  <FormControl>
                  <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        {
                          const files = e.target.files; // Store files in a variable
                          const file = files ? files[0] : null; // Check if files is not null
                          field.onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default SubmitProfileDetailForm;
