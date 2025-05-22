"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Styles from "./styles.bookmarks.module.css";

type bookmark = {
  icon: string;
  fallback: string;
  text: string;
  link: string;
};

export default function FavBar() {
  const [links, setLinks] = useState<bookmark[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/links`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setLinks);
  }, []);

  return (
    <div className="">
      <nav className="">
        <ul className="flex flex-row flex-wrap gap-4 justify-center">
          {links.map((item, idx) => (
            <li key={idx}>
              <Button asChild className={Styles.glass}>
                <div>
                  <Avatar>
                    <AvatarImage src={item.icon} />
                    <AvatarFallback>{item.fallback}</AvatarFallback>
                  </Avatar>
                  <Link href={item.link}>{item.text}</Link>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
