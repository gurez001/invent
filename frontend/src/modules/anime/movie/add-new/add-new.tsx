"use client";

import { useState } from "react";
import * as z from "zod";
import MoviePostFromCard from "@/components/movie-post/post-form-card";
import { useImageDrop } from "@/hooks/handleMediaDrop";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllcategorieQuery } from "@/state/karnal-web-tech/categorieApi";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";
import toast from "react-hot-toast";
import { MovieformSchema } from "@/zod-schemas/anime/movieSchema";

export const AddNew = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  //----------------- use hookes
  const { imageitemData, files, handleDrop } = useImageDrop();
  const { data: categorie_data, error: categorie_error } =
    useGetAllcategorieQuery({
      rowsPerPage: 1000,
      page: 1,
      type: "portfolio",
    });
  const { data: categorieApiData } = categorie_data || {};

  useHandleNotifications({
    error: categorie_error
    // isSuccess,
    // successMessage: "Portfolio Added successfully!",
    // redirectPath: "/karnalwebtech/portfolio",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof MovieformSchema>>({
    resolver: zodResolver(MovieformSchema),
  });
  // 2. Define the submit handler
  const onSubmit: SubmitHandler<any> = async (data) => {
    if (files.length < 1) {
      toast.error("Please add a image");
      return;
    }
    const updated_data = {
      ...data,
      keywords,
      uuid: generate32BitUUID(),
      images: files,
      categorie: selectedCategories,
    };
    // await addNewPost(updated_data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="dark-custom">
        <MoviePostFromCard
          control={control} // react form
          errors={errors} // react form
          setValue={setValue} // react form
          watch={watch} // react form
          imageitemData={imageitemData}
          handleDrop={handleDrop}
          setKeywords={setKeywords}
          keywords={keywords}
          isVisiableCategory={true}
          isVisiableTag={true}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          pageTitle={"Anime"}
          discard_link={"/karnalwebtech/portfolio"}
          categorieList={categorieApiData?.result}
          isLoading={false}
        />
      </form>
    </>
  );
};
