"use client";
import React, { useState } from "react";
import Popover_component from "@/components/Popover_component/Popover_component";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TagList from "./tag-list";

const Tag = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const edit_handler = (value: string) => {
    };
    return (
        <div>
            <div className='w-[150px] my-4'>
                <Button className='bg-black text-white hover:text-black' onClick={(()=>router.push('/karnalwebtech/post/add-new-tag'))}>Add new post</Button>
            </div>
            {isOpen && (
                <Popover_component
                    open={isOpen}
                    set_open={setIsOpen}
                    components={
                        <>
                            comming soon
                        </>
                    }
                />
            )}

            <TagList set_open={setIsOpen} edit_handler={edit_handler} />
        </div>
    );
};

export default Tag;
