"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Popover_component from "@/components/Popover_component/Popover_component";
import Categotie_form from './Categotie_form';
import { Button } from '@nextui-org/react';
import { useAddNewCategorieMutation } from '@/state/categoriesApi';
import { categorie_form } from '@/types/categorie_type';
import toast from 'react-hot-toast';
import { generate32BitUUID } from '@/lib/service/generate32BitUUID';

const Category = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const [addNewCategorie, { error, isLoading, isSuccess }] = useAddNewCategorieMutation();
    const onSubmit = useCallback(
        async (data: categorie_form) => {
         console.log(files)
            const updated_data = { ...data, uuid: generate32BitUUID(), images: files };
            console.log(updated_data)
            await addNewCategorie(updated_data)
        },
        [addNewCategorie,files],
    )

    useEffect(() => {
        // Handle error messages
        if (error) {
            let errorMessage = "An unexpected error occurred."; // Default message

            // Check if 'error' is defined and has the expected structure
            if (error && 'data' in error) {
                errorMessage = (error as { data?: { message?: string } }).data?.message || errorMessage;
            }

            //   // Check if 'update_error' is defined and has the expected structure
            //   if (update_error && 'data' in update_error) {
            //     errorMessage = (update_error as { data?: { message?: string } }).data?.message || errorMessage;
            //   }

            toast.error(errorMessage);
            //   setOperationSuccess(false); // Reset success state on error
            return; // Exit early if there's an error
        }

        // Handle success messages
        if (isSuccess) {
            //   setIsOpen(false);
            //   setEdit(false);
            toast.success("Customer added successfully");
            //   setOperationSuccess(false); // Reset success state after handling success
        }
        // else if (update_success && operationSuccess) {
        //   setIsOpen(false);
        //   setEdit(false);
        //   toast.success("Customer updated successfully");
        //   setOperationSuccess(false); // Reset success state after handling success
        // }

        // Reset edit state if the popover is closed
        // if (!isOpen) {
        //   setEdit(false);
        // }
    }, [error, isSuccess, isOpen]);
    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Add new</Button>
            {isOpen && (
                <Popover_component
                    open={isOpen}
                    set_open={setIsOpen}
                    components={
                        <Categotie_form
                            files={files}
                            setFiles={setFiles}
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
    )
}

export default Category