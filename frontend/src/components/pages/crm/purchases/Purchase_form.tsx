"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Product_purchase_form_tableprops,
  purchase_product_list_props,
  purchase_type_props,
} from "@/types/Purchase_type";
import Autocomplete_field from "@/components/common/fields/Autocomplete_field";
import DatePicker_field from "@/components/common/fields/DatePicker_field";
import { purchase_schema } from "@/zod-schemas/Purchase_zod_schema";
import Input_field from "@/components/common/fields/Input_field";
import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import Autocomplete_normal from "@/components/common/fields/Autocomplete_normal";
import Select_normal from "@/components/common/fields/Select_normal";
import Input_normal from "@/components/common/fields/Input_normal";
import Product_purchase_form_table from "./Product_purchase_form_table";

const Purchase_form: React.FC<Product_purchase_form_tableprops> = ({ onSubmit, additional_number_data, set_additional_data, product_list, set_product_list }) => {

  const [publishStatus, setPublishStatus] = useState<string>("");
  const [productname, setproductname] = useState<string>("");
  const [qnty, set_qnty] = useState<number | string>(1);
  const [cat, set_cat] = useState<string | number>('');
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<purchase_type_props>({
    resolver: zodResolver(purchase_schema),
    defaultValues: {},
  });

  const make_list = (): void => {
    const newProduct: purchase_product_list_props = {
      key: Date.now().toString(),
      product_name: productname,
      quantity: typeof qnty === "string" ? parseInt(qnty, 10) : qnty,
    };
    set_product_list([...product_list, newProduct]);
  };

  const users = [
    {
      label: "SHRI Ram",
      value: "SHRI Ram",
      description: "The second most popular pet in the world",
    },
    {
      label: "GUREZ",
      value: "GUREZ",
      description: "The most popular pet in the world",
    },
    {
      label: "Elephant",
      value: "elephant",
      description: "The largest land animal",
    },
  ];
  const category = [
    {
      label: "All",
      value: "All",
      description: "The second most popular pet in the world",
    },
    {
      label: "Corugated",
      value: "Corugated",
      description: "The most popular pet in the world",
    },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 md:col-span-3">
          <Autocomplete_field
            control={control}
            errors={errors}
            name="vendor"
            options={users}
            label_name="Select Vendor"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-4">
        <div>
          <DatePicker_field
            control={control}
            errors={errors}
            name="purchase_date"
            label="Purchase Date"
          />
        </div>
        <div>
          <DatePicker_field
            control={control}
            errors={errors}
            name="due_date"
            label="Due Date"
          />
        </div>
        <div>
          <DatePicker_field
            control={control}
            errors={errors}
            name="supplier_invoice_date"
            label="Supplier invoice Date"
          />
        </div>
        <div>
          <Input_field
            control={control}
            errors={errors}
            name="supplier_invoice_serial_no"
            label="Supplier invoice serial no"
          />
        </div>
        <div>
          <Input_field
            control={control}
            errors={errors}
            name="reference"
            label="Reference"
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col items-center md:flex-row gap-2">
          <div className="w-full md:w-3/12 ">
            <Select_normal
              label={"Select by category"}
              options={category}
            get_value={(value)=>set_cat(value)}
            />
          </div>
          <div className="w-full md:w-6/12">
            <Autocomplete_normal
              options={users}
              label_name="Select Products"
              setproductname={setproductname}
            />
          </div>
          <div className="w-full flex items-center gap-2 md:w-3/12">
            <div>
              <Input_normal
                type="number"
                label="Quantity"
              get_value={set_qnty}
              />
            </div>
            <div>
              <Button
                color="primary"
                variant="ghost"
                startContent={<Plus />}
                onClick={() => make_list()}
              >
                Add to Bill
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Product_purchase_form_table product_list={product_list} set_product_list={set_product_list}
          additional_number_data={additional_number_data} set_additional_data={set_additional_data}
        />
      </div>

      <div className="flex gap-2">
        <Button type="button" onClick={() => setPublishStatus("Draft")}>
          Save as Draft
        </Button>
        <Button onClick={() => setPublishStatus("Publish")} type="submit">
          Publish
        </Button>
      </div>

    </form>

  );
};

export default Purchase_form;
