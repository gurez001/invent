"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Modal } from "../modal/modal";
import { SEOForm } from "../common/form/seo-form";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
interface ImageCardProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  isVisible?: boolean;
  onSubmit?: any;
  control?: any;
  handleSubmit?: any;
  errors?: any;
  setValue?: any;
  watch?: any;
  keywords?: any; setKeywords?: any;
}

export default function Server_image_card({
  src,
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
  keywords, setKeywords,
}: ImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
      <Card className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <CardContent>
          <Image src={src} alt={alt} width={width} height={height} priority />
        </CardContent>
      </Card>
      {isVisible && (
        <Modal
          title="Edit SEO Information"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <form className='overflow-y-auto max-h-[600px] scrollbar-hide' onSubmit={handleSubmit(onSubmit)}>
            <SEOForm imageSrc={src} imageAlt={alt}
              control={control}
              errors={errors}
              watch={watch}
              setValue={setValue}
              setKeywords={setKeywords}
              keywords={keywords}
            /></form>
        </Modal>
      )}
    </>
  );
}
