"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Popover_component from "@/components/Popover_component/Popover_component";
import { Button } from "@nextui-org/react";
import Product_form from "./Product_form";

const Product = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [operationSuccess, setOperationSuccess] = useState<boolean>(false);
    const onSubmit = (data:any)=>{
        console.log(data)
    }
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Add new</Button>
      {isOpen && (
        <Popover_component
          open={isOpen}
          set_open={setIsOpen}
          components={
            <Product_form
              // isLoading={false}
              // edit={edit}
              // open={isOpen}
              set_open={setIsOpen}
              // vendor_data={vendor}
              onsubmit={onSubmit}
            />
          }
        />
      )}
    </div>
  );
};

export default Product;
