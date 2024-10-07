"use client";
import Autocomplete_field from "@/components/common/fields/Autocomplete_field";
import Input_field from "@/components/common/fields/Input_field";
import Secondary_Autocomplete_field from "@/components/common/fields/Secondary_Autocomplete_field";
import Secondary_select_Field from "@/components/common/fields/Secondary_select_Field";
import Select_field from "@/components/common/fields/Select_field";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Image_card from "@/components/image_compress/Image_card";
import {
  gst_arr,
  Primary_units_arr,
  status_arr,
} from "@/components/pages/common/Data";
import { useGetAllcategorieQuery } from "@/state/categoriesApi";
import { product_type_form } from "@/types/Product_types";
import { productTypeFormSchema } from "@/zod-schemas/product_zod_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";
import debounce from "lodash.debounce";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface vender_form_props {
  set_open: (value: boolean) => void;
  onsubmit: (data: any) => void;
}

const Product_form: React.FC<vender_form_props> = ({ set_open, onsubmit }) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<product_type_form>({
    resolver: zodResolver(productTypeFormSchema),
    defaultValues: {
      status: "active",
    },
  });
  const categorieValue = watch("categorie");
  const [filterValue, setFilterValue] = useState<string>("");
  const [debouncedFilterValue, setDebouncedFilterValue] =
    useState<string>(filterValue);
  const [files, setFiles] = useState<File[]>([]);
  const [itemData, setItemData] = useState<{ img: string; name: string }[]>([]);

  //----------- all use stats

  const { data, error, isLoading } = useGetAllcategorieQuery({
    is_active: "yes",
    is_delete: "no",
    keyword: debouncedFilterValue,
    status: "active",
    rowsPerPage: 10,
    page: 1,
  });

  //------------- all events
  const handleDrop = (acceptedFiles: File[]) => {
    const imageData = acceptedFiles.map((file) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    setFiles(acceptedFiles);
    setItemData(imageData);
  };

  const handleDebouncedFilter = useMemo(
    () => debounce((value) => setDebouncedFilterValue(value), 300),
    []
  );
  useEffect(() => {
    handleDebouncedFilter(filterValue);
  }, [filterValue, handleDebouncedFilter]);
  useEffect(() => {
    if (categorieValue) {
      console.log("Categorie changed:", categorieValue);
      // Perform any other logic here
    }
  }, [categorieValue]);

  const handleDelete = (index: number) => {
    const newImages = files.filter((_, i) => i !== index);
    const imageData = newImages.map((file) => ({
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
                  label="Item Name"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="selling_price"
                  label="Selling Price"
                />
              </div>
              <div className="w-[49%]">
                <Select_field
                  control={control}
                  errors={errors}
                  name="tax"
                  label="tax"
                  options={gst_arr}
                />
              </div>
              <div className="w-[49%]">
                <Secondary_Autocomplete_field
                  control={control}
                  errors={errors}
                  name="primary_unit"
                  label_name="Primary Unit"
                  options={Primary_units_arr}
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="sku"
                  label="sku"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="text-lg py-2">Additional Information OPTIONAL</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="w-[49%]">
              <Input_field
                control={control}
                errors={errors}
                name="hsn"
                label="HSN/ SAC"
              />
            </div>
            <div className="w-[49%]">
              <Input_field
                control={control}
                errors={errors}
                name="purchase_price"
                label="Purchase Price"
              />
            </div>
            <div className="w-[49%] flex gap-2 items-center">
              <div className="w-[65%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="barcode"
                  label="barcode"
                />
              </div>
              <div className="w-[35%]">
                <Button size="sm" className="bg-black text-white">
                  Auto Generate
                </Button>
              </div>
            </div>
            <div className="w-[49%]">
              <Secondary_Autocomplete_field
                control={control}
                errors={errors}
                name="categorie"
                label_name="categorie"
                options={Primary_units_arr}
              />
            </div>
            <div className="w-[49%]">
              <Input_field
                control={control}
                errors={errors}
                name="total_quantity"
                label="Total Quantity"
              />
            </div>
            <div className="w-full">
              <p className="text-lg py-2">Product Dimantion</p>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="weight"
                  label="weight"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="weight"
                  label="weight"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="depth"
                  label="depth"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="width"
                  label="width"
                />
              </div>
              <div className="w-[49%]">
                <Input_field
                  control={control}
                  errors={errors}
                  name="height"
                  label="height"
                />
              </div>
            </div>
            <div className="w-full">
              <p className="text-lg py-2">Product Image</p>
              <div>
                <div className=" w-full p-4 lg:w-3/12 lg:p-2">
                  <div>
                    <Drag_input_field onDrop={handleDrop} />
                  </div>
                  <div>
                    {/* <Image_card itemData={itemData} onDelete={handleDelete} /> */}
                  </div>
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

export default Product_form;
