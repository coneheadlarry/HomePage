"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FavBar from "./components/bookmarks";
import styles from "./styles.homepage.module.css";
import SearchBar from "./components/search";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        if (!data.authenticated) {
          router.push("/signIN");
        } else {
          setRole(data.role || null);
        }
      })
      .catch(() => {
        router.push("/signIN");
      });
  }, [router]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div
          className={`flex flex-col h-full min-h-[80vh] w-full md:w-[80vw] ${styles.glass}`}
        >
          {role === "admin" && (
            <div className="flex justify-end">
              <Button asChild className="min-h-[2vh] mt-4 mr-4">
                <Link href="/AdminPanel">Admin Panel</Link>
              </Button>
            </div>
          )}
          <div className="flex-1">{}</div>
          <SearchBar />
          <div className="flex-1 flex  justify-center">
            <FavBar />
          </div>
        </div>
      </div>
    </>
  );
}
