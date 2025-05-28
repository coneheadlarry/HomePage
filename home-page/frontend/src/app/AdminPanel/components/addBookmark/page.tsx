"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  icon: z.string().url({ message: "Must be a valid URL" }),
  fallback: z.string().min(1, { message: "Required" }),
  text: z.string().min(1, { message: "Required" }),
  link: z.string().url({ message: "Must be a valid URL" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddBookmarkPage() {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: "",
      fallback: "",
      text: "",
      link: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setSuccess(null);
    setError(null);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/add_link`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to add bookmark");
      }
      setSuccess("Bookmark added!");
      form.reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Unknown error");
      } else {
        setError("Unknown error");
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md min-h-[40vh] rounded-lg bg-card p-8 shadow-md text-card-foreground">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Bookmark</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/favicon.ico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fallback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fallback Text</FormLabel>
                  <FormControl>
                    <Input placeholder="EX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Example" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit">Add Bookmark</Button>
            </div>
            {success && (
              <div className="text-green-600 text-center">{success}</div>
            )}
            {error && <div className="text-red-600 text-center">{error}</div>}
          </form>
        </Form>
      </div>
    </div>
  );
}
