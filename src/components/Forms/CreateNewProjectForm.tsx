"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Button } from "../ui/button";

const formSchema = z.object({
  projectTitle: z.string().min(5, {
    message: "Project Title must be at least 5 characters.",
  }),
  difficulty: z.string({
    required_error: "Difficulty is required.",
  }),
  projectDescription: z.string().min(60, {
    message: "Project Description must be at least 60 characters.",
  }),
});

export function CreateNewProjectForm() {
  const navigate = useNavigate(); // Initialize useNavigate
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectTitle: "",
      difficulty: "",
      projectDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const projectType = "NEW"; 
  
      const token = localStorage.getItem('token'); 
  
      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          name: values.projectTitle,
          description: values.projectDescription,
          type: projectType, 
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Project created:', data);
        
        // Redirect to the projects page after successful submission
        navigate('/dashboard/projects'); // Use navigate to go to the projects page
      } else {
        const errorData = await response.json(); 
        console.error('Failed to create project:', errorData);
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  }
  

  return (
    <div className="border-2 h-full w-full rounded-lg flex flex-col px-4 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:justify-between justify-around">
            <FormField
              control={form.control}
              name="projectTitle"
              render={({ field }) => (
                <FormItem className="w-full max-w-[50%]">
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Title .." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-80"
                      placeholder="Project Description ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 justify-end px-4 py-4">
            <Button type="button" className="bg-red-500" onClick={() => navigate('/dashboard/projects')}>
               Cancel
            </Button>
            <Button type="submit" className="bg-bhasiniBlue">
               Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
