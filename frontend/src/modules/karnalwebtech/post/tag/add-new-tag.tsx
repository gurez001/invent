"use client";

import { useState } from "react";
import PostFromCard from "@/components/post/post-form-card";
import { useImageDrop } from "@/hooks/handleMediaDrop";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/zod-schemas/karnal-web-tech/post_zod_schema";

export default function AddNewPostTag() {
  const { imageitemData, files, handleDrop } = useImageDrop();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      username: "",
      content: "",
    },
  });
  // 2. Define the submit handler
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form Data: ", data, keywords, selectedCategories, files);
    // Perform any action with the form data here
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="dark-custom">
        <PostFromCard
          control={control} // react form
          errors={errors} // react form
          setValue={setValue} // react form
          watch={watch} // react form
          imageitemData={imageitemData}
          handleDrop={handleDrop}
          setKeywords={setKeywords}
          keywords={keywords}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          isVisiableCategory={false} // optinoal
          pageTitle={"Tag"}
        />
      </form>
    </>
  );
}
