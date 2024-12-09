"use client";
import React from "react";
import PostList from "./post-list";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";

const Post = () => {
  const router = useRouter();

  return (
    <div>
      <div className="w-[150px] my-4 flex gap-4">
        <Button
          className="bg-black text-white hover:text-black"
          onClick={() => router.push("/karnalwebtech/post/add-new")}
        >
          Add new post
        </Button>
        <Button
          className="bg-red border text-black hover:bg-gray-200"
          onClick={() => router.push("/karnalwebtech/post/add-new")}
        >
          <Trash color="red" />  Clear cache
        </Button>
      </div>

      <PostList />
    </div>
  );
};

export default Post;
