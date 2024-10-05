"use client";
import Autocomplete_field from "@/components/common/fields/Autocomplete_field";
import Input_field from "@/components/common/fields/Input_field";
import Secondary_Autocomplete_field from "@/components/common/fields/Secondary_Autocomplete_field";
import Secondary_select_Field from "@/components/common/fields/Secondary_select_Field";
import Select_field from "@/components/common/fields/Select_field";
import Text_area_field from "@/components/common/fields/Text_area_field";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Image_card from "@/components/image_compress/Image_card";
import { status_arr } from "@/components/pages/common/Data";
import { categorie_form } from "@/types/categorie_type";
import { category_schema } from "@/zod-schemas/categorie_zod_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface vender_form_props {
  set_open: (value: boolean) => void;
  onsubmit: (data: any) => void;
  files: File[];
  setFiles: (files: File[]) => void;
}

const Categotie_form: React.FC<vender_form_props> = ({
  set_open,
  onsubmit,
  files, setFiles
}) => {
  const [itemData, setItemData] = useState<{ img: string; name: string }[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<categorie_form>(

    {
      resolver: zodResolver(category_schema),
      defaultValues: {
        status: "active"
      }
    }
  );

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      toast.error("Image allowed only 1");
      return;
    }
    const imageData = acceptedFiles.map((file) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    setFiles(acceptedFiles);
    setItemData(imageData);
  };

  const handleDelete = (index: number) => {
    const newImages = files.filter((_:any, i:number) => i !== index);
    const imageData = newImages.map((file:any) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    setFiles(newImages);
    setItemData(imageData);
  };

  return (
    <div>
      <div>
        <ModalHeader className="flex flex-col gap-1">
          {/* {edit ? "Update Vender From" : "Vender From"} */}
        </ModalHeader>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex  items-center justify-between p-2">
            <p className="text-lg">Basic Details</p>
            <div className="w-52">
              <Select_field
                control={control}
                errors={errors}
                name="status"
                label="select status"
                options={status_arr}
              />
            </div>
          </div>
          <div className="bg-white">
            <div className="flex flex-wrap gap-2">
              <div className="w-full">
                <Input_field
                  control={control}
                  errors={errors}
                  name="name"
                  label="Categorie Name"
                />
              </div>
              <div className="w-full">
                <Text_area_field
                  control={control}
                  errors={errors}
                  name="description"
                  label="Description"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full">
            <div className="w-full">
              <p className="text-lg py-2">Categorie Image</p>
              <div>
                <div className="w-60 p-4 lg:p-2">
                  <div>
                    <Drag_input_field onDrop={handleDrop} />
                  </div>
                </div>
                <div className='flex w-full flex-wrap  gap-2'>
                  {itemData.map((item, index) => (
                    <div key={index} className='w-[50%] sm:w-"50%" md:w-[40%] lg:w-[40%]'>
                      <Image_card item={item} index={index} onDelete={handleDelete} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => set_open(false)}
              >
                Close
              </Button>

              <Button
                isLoading={false}
                className="bg-black text-white"
                type="submit"
              >
                Save
              </Button>
            </ModalFooter>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Categotie_form;
