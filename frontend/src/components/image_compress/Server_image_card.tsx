"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from "../modal/modal";
import { SEOForm } from "../common/form/seo-form";
import Image from "next/image";
import LoadingPage from "../common/loading-page";
import { SubmitHandler } from "react-hook-form";

interface ImageCardProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  id: string;
  isVisible?: boolean;
  onSubmit: SubmitHandler<any>;
  control: any;
  handleSubmit: (fn: SubmitHandler<any>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: Record<string, any>;
  setValue: (field: string, value: any) => void;
  watch: (field: string) => any;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  getSingleDataHandler: (id: string) => void;
  isLoading?: boolean;
  isUpdateLoading?: boolean;
  isSuccess?: boolean;
}

export default function Server_image_card({
  src,
  id,
  alt,
  width,
  height,
  isVisible = false,
  onSubmit,
  control,
  handleSubmit,
  errors,
  setValue,
  watch,
  keywords,
  setKeywords,
  getSingleDataHandler,
  isLoading = false,
  isUpdateLoading = false,
  isSuccess = false,
}: ImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal if submission is successful
  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen(false);
    }
  }, [isSuccess]);

  // Handle card click to fetch data and open modal
  const handleCardClick = () => {
    getSingleDataHandler(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="cursor-pointer" onClick={handleCardClick}>
        <CardContent>
          <Image src={src} alt={alt} width={width} height={height} priority />
        </CardContent>
      </Card>

      {isVisible && (
        <Modal title="SEO Details" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} aria-describedby="modal-description">
          <form
            id="modal-description"
            className="overflow-y-auto h-[600px] scrollbar-hide relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <LoadingPage class_style="text-gray-200" />
              </div>
            ) : (
              <SEOForm
                imageSrc={src}
                imageAlt={alt}
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
                setKeywords={setKeywords}
                keywords={keywords}
                isLoading={isUpdateLoading}
              />
            )}
          </form>
        </Modal>
      )}
    </>
  );
}
