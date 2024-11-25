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
  setDilogOpen: (open: boolean) => void;
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
  setDilogOpen,
}: ImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle modal state and dialog state synchronization
  useEffect(() => {
    if (isSuccess && isModalOpen) {
      setIsModalOpen(false);
    }
    if (setDilogOpen && typeof setDilogOpen === "function") {
      setDilogOpen(isModalOpen);
    }
  }, [isSuccess, isModalOpen, setDilogOpen]);

  // Function to handle card click
  const handleCardClick = () => {
    getSingleDataHandler(id);
    setIsModalOpen(true);
  };

  // Function to close modal
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Card className="cursor-pointer" onMouseDown={(e) => e.preventDefault()} onClick={handleCardClick}>
        <CardContent>
          <Image src={src} alt={alt} width={width} height={height} priority />
        </CardContent>
      </Card>

      {isVisible && (
        <Modal title="" isOpen={isModalOpen} onClose={handleCloseModal}>
          <form
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
