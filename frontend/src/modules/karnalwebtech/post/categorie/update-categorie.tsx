"use client";

import { useEffect, useState } from "react";
import PostFromCard from "@/components/post/post-form-card";
import { useImageDrop } from "@/hooks/handleMediaDrop";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/zod-schemas/karnal-web-tech/post_zod_schema";
import {
  useAddNewCategorieMutation,
  useGetSingleQuery,
  useUpdateMutation,
} from "@/state/karnal-web-tech/categorieApi";
import toast from "react-hot-toast";
import { generate32BitUUID } from "../../../../lib/service/generate32BitUUID";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/common/loading-page";
import * as z from "zod";
interface UpdatePostCategorieProps {
  id: string;
}
export default function UpdatePostCategorie({ id }: UpdatePostCategorieProps) {
  const { data, error, isLoading } = useGetSingleQuery(id);
  const {data:apidata}= data ||{};
  const { imageitemData, files, fileData, setFileData, handleDrop } = useImageDrop();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [update, { isSuccess }] = useUpdateMutation();
  type FormValues = z.infer<typeof postSchema>;
  // console.log(data)
  // console.log(keywords)
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      status: "",
    },
  });
console.log(data)
  // 2. Define the submit handler
  const image_url = apidata?.feature_image._id;
  const onSubmit: SubmitHandler<any> = async (data, e: any) => {
    const images = files.length > 0 ? files : image_url;
    const updated_data = { ...data, id: id, keywords, images };
    await update(updated_data);
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
    // if (isSuccess) {
    //   toast.success("Categorie added successfully");
    //   router.push("/karnalwebtech/post/categorie");
    // }
  }, [error, isSuccess, router]);

  useEffect(() => {
    if (apidata) {
      setValue("title", apidata.title);
      setValue("status", apidata?.status);
      setValue("content", apidata.content);
      setValue("metaTitle", apidata?.seo?.title);
      setValue("metaDescription", apidata?.seo?.meta_description);
      setValue("metaCanonicalUrl", apidata?.seo?.canonical_url);
      setKeywords(apidata?.seo?.keywords || []);
      setFileData(apidata?.feature_image)
    }
  }, [apidata, setValue, setKeywords, setFileData]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="dark-custom relative">
        {isLoading ? (
          <div className="pt-28">
            <LoadingPage />
          </div>
        ) : (
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
            discard_link="/karnalwebtech/post/categorie"
            image_files={fileData}
          />
        )}
      </form>
    </>
  );
}
