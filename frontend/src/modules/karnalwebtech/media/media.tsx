"use client";
import LoadingPage from "@/components/common/loading-page";
import ShadcnTableFooter from "@/components/common/shadcn-table/table-footer";
import Server_image_card from "@/components/image_compress/Server_image_card";
import { useHandleNotifications } from "@/hooks/useHandleNotifications";
import { generate32BitUUID } from "@/lib/service/generate32BitUUID";
import { useGetAllImagesQuery } from "@/state/karnal-web-tech/imageApi";
import { imageSchema } from "@/zod-schemas/karnal-web-tech/image_zod_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export default function ImageGallery() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<string>("25");
  const [page, setPage] = useState<number>(1);

  const { data, error, isLoading } = useGetAllImagesQuery({
    rowsPerPage: Number(rowsPerPage),
    page: page,
  });

  useHandleNotifications({ error: error });
  const { data: api_data } = data || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({
    resolver: zodResolver(imageSchema),
  });
  const onSubmit: SubmitHandler<any> = async (data) => {
    const updated_data = {
      ...data,
      keywords,
      uuid: generate32BitUUID(),
    };
  };
  return (
    <div className="container mx-auto py-8">
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">Image Gallery</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {api_data?.result.map((image: any, index: number) => (
              <Server_image_card
                width={300}
                height={200}
                key={index}
                src={image.path}
                alt={image.altText || "image"}
                isVisible={true}
                onSubmit={onSubmit}
                control={control}
                handleSubmit={handleSubmit}
                errors={errors}
                setValue={setValue}
                watch={watch}
                keywords={keywords} setKeywords={setKeywords}
              />
            ))}
          </div>
          <ShadcnTableFooter
            currentPage={page}
            totalPages={api_data?.resultPerPage}
            setCurrentPage={setPage}
            data_length={api_data?.dataCounter}

          />
        </>
      )}
    </div>
  );
}
