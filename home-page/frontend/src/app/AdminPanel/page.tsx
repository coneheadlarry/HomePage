import SignUpPage from "./components/signUp/page";
import AddBookmarkPage from "./components/addBookmark/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminPanel() {
  return (
    <>
      <div className="m-4">
        <Button asChild>
          <Link href="/HomePage">Home Page</Link>
        </Button>
      </div>
      <div className="flex justify-around min-h-screen">
        <SignUpPage></SignUpPage>
        <AddBookmarkPage></AddBookmarkPage>
      </div>
    </>
  );
}
