"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FavBar from "./components/bookmarks";
import styles from "./styles.homepage.module.css";
import SearchBar from "./components/search";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LocalTime from "../utils/getTime";
import WidgetArea from "./components/widMap";

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/session`, {
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
          className={`flex flex-col h-[80vh] w-full md:w-[80vw] ${styles.glass}`}
        >
          <div className="h-[45%] flex justify-between items-start p-4">
            <div>
              <div>
                <WidgetArea />
              </div>
            </div>

            <div className="flex flex-row items-center gap-4 m-4">
              <LocalTime />
              {role === "admin" && (
                <Button asChild>
                  <Link href="/AdminPanel">Admin Panel</Link>
                </Button>
              )}
            </div>
          </div>

          <div className="h-[10%] px-4 flex items-center">
            <SearchBar />
          </div>

          <div className="h-[45%] overflow-auto px-4 pb-4">
            <FavBar />
          </div>
        </div>
      </div>
    </>
  );
}
