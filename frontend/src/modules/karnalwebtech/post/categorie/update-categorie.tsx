"use client";

import { useEffect, useState } from "react";
import PostFromCard from "@/components/post/post-form-card";
import { useImageDrop } from "@/hooks/handleMediaDrop";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/zod-schemas/karnal-web-tech/post_zod_schema";
import { useAddNewCategorieMutation } from "@/state/karnal-web-tech/categorieApi";
import toast from "react-hot-toast";
import { generate32BitUUID } from "../../../../lib/service/generate32BitUUID";
import { useRouter } from "next/navigation";

interface UpdatePostCategorieProps{
    id:string;
}
export default function UpdatePostCategorie({id}:UpdatePostCategorieProps) {
    console.log(id)
  const { imageitemData, files, handleDrop } = useImageDrop();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [addNewCategorie, { error, isLoading, isSuccess }] =
    useAddNewCategorieMutation();
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
  const onSubmit: SubmitHandler<any> = async (data, e: any) => {
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement;
    const updateddData = {
      ...data, keywords, uuid: generate32BitUUID(), images: files
    }

    await addNewCategorie(updateddData);
    // Perform any action with the form data here
  };


  useEffect(() => {
    // Handle error messages
    if (error) {
      let errorMessage = "An unexpected error occurred."; // Default message

      // Check if 'error' is defined and has the expected structure
      if (error && "data" in error) {
        errorMessage =
          (error as { data?: { message?: string } }).data?.message ||
          errorMessage;
      }

      toast.error(errorMessage);
      return; // Exit early if there's an error
    }
    // Handle success messages
    if (isSuccess) {
      toast.success("Categorie added successfully");
      router.push("/karnalwebtech/post/categorie")
    }

  }, [
    error,
    isSuccess, router
  ]);

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
          pageTitle={"Categorie"}
          isLoading={isLoading}
          discard_link="/karnalwebtech/post/categorie"
        />
      </form>
    </>
  );
}
