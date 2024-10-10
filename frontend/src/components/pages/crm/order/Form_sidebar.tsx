"use client"
import Drag_input_field from '@/components/image_compress/Drag_input_field'
import Server_image_card from '@/components/image_compress/Server_image_card';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Image_card from "@/components/image_compress/Image_card";
import { useRouter } from 'next/navigation';
export const Form_sidebar = () => {
  const [item_invoice, setItem_invoice] = useState<{ img: string; name: string }[]>([]);
  const [item_doket, setItem_doket] = useState<{ img: string; name: string }[]>([]);
  const [item_image, setItem_image] = useState<{ img: string; name: string }[]>([]);
  const [field_visible, set_field_visible] = useState<boolean[]>([false, false, false]);
  const router = useRouter();
  const handleDrop = (acceptedFiles: File[], type?: string, field?: string) => {
    if (acceptedFiles.length > 1) {
      toast.error(type === "pdf" ? "Pdf allowed only 1" : `Image allowed only 1`);
      return;
    }
    const imageData = acceptedFiles.map((file) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    // setFiles(acceptedFiles);
    switch (field) {
      case "invoice":
        setItem_invoice(imageData);
        break;

      case "doket":
        setItem_doket(imageData);
        break;

      default:
        setItem_image(imageData);
        break;
    }
  };

  const handleDelete = (index: number, field?: string) => {
    const newImages = item_invoice.filter((_: any, i: number) => i !== index);
    const imageData = newImages.map((file: any) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    // setFiles(newImages);
    setItem_invoice(imageData);
  };
  const View_file_handler = (item: any) => {
    window.open(item.img, '_blank');
  };
  useEffect(() => {
    // Create an array with the visibility values based on the items
    const visibility = [
      item_invoice.length > 0, // true if there's at least one invoice
      item_doket.length > 0,   // true if there's at least one doket
      item_image.length > 0,    // true if there's at least one image
    ];

    // Update the visibility state based on the new values
    set_field_visible(visibility);
  }, [item_invoice, item_doket, item_image]);
  return (
    <div>
      <div className="w-full p-4">
        <div>
          <p className='my-4'>Invoice Upload</p>
          {field_visible[0] ?
            <div className="flex w-full flex-wrap  gap-2">
              {item_invoice.map((item: any, index: number) => (
                <div
                  key={index}
                  className='w-full'
                >
                  <Image_card
                    item={item}
                    index={index}
                    onDelete={() => handleDelete(index, 'invoice')}
                  />
                  <div onClick={() => View_file_handler(item)}>View</div>
                </div>
              ))}
            </div>
            : <Drag_input_field onDrop={(data: any) => handleDrop(data, 'pdf', 'invoice')} type='application/pdf' />
          }
        </div>
        <div>
          <p className='my-4'>Doket Upload</p>
          <Drag_input_field onDrop={(data: any) => handleDrop(data, 'pdf', 'doket')} type='application/pdf' />
        </div>
        <div>
          <p className='my-4'>Payment image Upload</p>
          <Drag_input_field onDrop={(data: any) => handleDrop(data, 'image', 'payment')} type='application/pdf' />
        </div>
      </div>
    </div>
  )
}
