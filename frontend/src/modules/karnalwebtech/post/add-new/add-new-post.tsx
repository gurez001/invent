"use client";
import { useState } from "react";
import PostFromCard from "@/components/post/post-form-card";
import { useImageDrop } from "@/hooks/handleMediaDrop";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/zod-schemas/karnal-web-tech/post_zod_schema";
import { useGetAllcategorieQuery } from "@/state/karnal-web-tech/categorieApi";
import { useGetAllTagQuery } from "@/state/karnal-web-tech/tagApi";
import { useAddNewPostMutation } from "@/state/karnal-web-tech/postApi";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";

export default function AddNewPost() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    []
  );
  const [selectedTag, setSelectedTags] = useState<string[]>(
    []
  );
  const [keywords, setKeywords] = useState<string[]>([]);
  //----------------- use hookes
  const { imageitemData, files, handleDrop } = useImageDrop();
  const { data: categorie_data, error: categorie_error } = useGetAllcategorieQuery({
    rowsPerPage: 1000,
    page: 1,
    type: "post",
  });
  const { data: tag_data, error: tag_Error } = useGetAllTagQuery({
    rowsPerPage: 1000,
    page: 1,
    type: "post",
  });
  const [addNewPost]= useAddNewPostMutation();
  const { data: categorieApiData } = categorie_data || {};
  const { data: tagApiData } = tag_data || {};
 
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue, watch
  } = useForm<any>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      username: "",
      content: "",
    },
  });
  // 2. Define the submit handler
  const onSubmit: SubmitHandler<any> =async (data) => {
    const updated_data = {
      ...data,
      keywords,
      uuid: generate32BitUUID(),
      images: files,
      tags:selectedTag,
      categorie:selectedCategories,
    }
    await addNewPost(updated_data)
    // console.log("Form Data: ", data, keywords, selectedCategories, files, selectedTag);
    // Perform any action with the form data here
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="dark-custom">
        <PostFromCard
          control={control} // react form
          errors={errors} // react form
          setValue={setValue} // react form
          watch={watch}// react form
          imageitemData={imageitemData}
          handleDrop={handleDrop}
          setKeywords={setKeywords}
          keywords={keywords}
          isVisiableCategory={true}
          isVisiableTag={true}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          pageTitle={"Post"}
          discard_link={"/karnalwebtech/post"}
          categorieList={categorieApiData?.result}
          selectedTag={selectedTag}
          setSelectedTags={setSelectedTags}
          tagList={tagApiData?.result}
        />
      </form>
    </>
  );
}