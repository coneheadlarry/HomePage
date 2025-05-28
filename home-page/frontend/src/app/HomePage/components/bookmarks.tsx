"use client";
import { useEffect, useState, useRef } from "react";
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
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    idx: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get_links`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setLinks);
  }, []);

  async function handleDelete(idx: number) {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/links/${idx}`, {
      method: "DELETE",
      credentials: "include",
    });
    setLinks((prev) => prev.filter((_, i) => i !== idx));
    setMenu(null);
  }

  return (
    <div
      ref={containerRef}
      className="overscroll-auto md:overscroll-contain"
      style={{ position: "relative" }}
    >
      <nav>
        <ul className="flex flex-row flex-wrap gap-4 justify-center">
          {links.map((item, idx) => (
            <li
              key={idx}
              onContextMenu={(e) => {
                e.preventDefault();
                const rect = containerRef.current?.getBoundingClientRect();
                const x = e.pageX - (rect?.left ?? 0) - window.scrollX;
                const y = e.pageY - (rect?.top ?? 0) - window.scrollY;
                setMenu({ x, y, idx });
              }}
            >
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
        {menu && (
          <div
            className="absolute bg-black rounded-xl border-2 border-red-500 rounded shadow p-2 z-50"
            style={{ top: menu.y, left: menu.x, minWidth: 120 }}
            onClick={() => setMenu(null)}
          >
            <button
              className="text-red-600 hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(menu.idx);
              }}
            >
              Delete Bookmark
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
