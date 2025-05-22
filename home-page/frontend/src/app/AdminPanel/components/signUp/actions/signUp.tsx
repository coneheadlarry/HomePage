"use server";

import { formSchema } from "./schema";

export async function registerUser(formData: {
  username: string;
  password: string;
  role: "admin" | "user";
}) {
  const result = formSchema.safeParse(formData);
  if (!result.success) {
    return { error: "Invalid input", details: result.error.flatten() };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const text = await res.text();
    let error;
    try {
      error = JSON.parse(text);
    } catch {
      error = { message: text };
    }
    return { error: error.message || "Registration failed" };
  }

  const data = await res.json();
  return { success: true, ...data };
}
