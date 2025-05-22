"use client";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(
      query
    )}`;
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md flex mx-auto my-4">
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none"
        placeholder="Search DuckDuckGo..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[#de5833] text-black rounded-r hover:bg-purple-700"
      >
        Search
      </button>
    </form>
  );
}
