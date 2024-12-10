"use client";
import React from "react";
import PostList from "./post-list";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CacheRemover from "@/components/common/CacheRemover";

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
        <CacheRemover pattern={["posts"]} />
      </div>
      <PostList />
    </div>
  );
};

export default Post;
