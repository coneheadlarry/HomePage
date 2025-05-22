"use client";

export async function signIn({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Server error or invalid response");
  }

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}
