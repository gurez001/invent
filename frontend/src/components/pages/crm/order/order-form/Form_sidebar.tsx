"use client";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Server_image_card from "@/components/image_compress/Server_image_card";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image_card from "@/components/image_compress/Image_card";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, Divider } from "@nextui-org/react";

interface sidebar_props {
  invoice_files: File[];
  set_invoice_Files: (invoice_files: File[]) => void;
  doket_files: File[];
  set_doket_Files: (doket_files: File[]) => void;
  Image_files: File[];
  set_Image_Files: (Image_files: File[]) => void;
}
export const Form_sidebar: React.FC<sidebar_props> = ({
  invoice_files,
  set_invoice_Files,
  doket_files,
  set_doket_Files,
  Image_files,
  set_Image_Files,
}) => {
  const [item_invoice, setItem_invoice] = useState<
    { img: string; name: string }[]
  >([]);
  const [item_doket, setItem_doket] = useState<{ img: string; name: string }[]>(
    []
  );
  const [item_image, setItem_image] = useState<{ img: string; name: string }[]>(
    []
  );
  const [field_visible, set_field_visible] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const router = useRouter();
  const handleDrop = (acceptedFiles: File[], type?: string, field?: string) => {
    if (acceptedFiles.length > 1) {
      toast.error(
        type === "pdf" ? "Pdf allowed only 1" : `Image allowed only 1`
      );
      return;
    }
    const imageData = acceptedFiles.map((file) => ({
      img: URL.createObjectURL(file),
      name: file.name,
    }));
    // setFiles(acceptedFiles);
    switch (field) {
      case "invoice":
        set_invoice_Files(acceptedFiles);
        setItem_invoice(imageData);
        break;

      case "doket":
        set_doket_Files(acceptedFiles);
        setItem_doket(imageData);
        break;

      default:
        set_Image_Files(acceptedFiles);
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
  const View_file_handler = (item: any) => {
    window.open(item.img, "_blank");
  };
  useEffect(() => {
    // Create an array with the visibility values based on the items
    const visibility = [
      item_invoice.length > 0, // true if there's at least one invoice
      item_doket.length > 0, // true if there's at least one doket
      item_image.length > 0, // true if there's at least one image
    ];

    // Update the visibility state based on the new values
    set_field_visible(visibility);
  }, [item_invoice, item_doket, item_image]);
  return (
    <div>
      <div className="w-full p-4">
        <Card>
          <CardBody>
            <p className="my-4">Invoice Upload</p>
            {field_visible[0] ? (
              <div className="flex  w-full flex-wrap  gap-2">
                {item_invoice.map((item: any, index: number) => (
                  <>
                    <div key={index} className="w-full">
                      <Image_card
                        item={item}
                        index={index}
                        onDelete={() => handleDelete(index, "invoice")}
                      />
                    </div>
                    <Divider />
                    <Button
                      className="bg-black mt-2 text-white"
                      onClick={() => View_file_handler(item)}
                    >
                      View PDF
                    </Button>
                  </>
                ))}
              </div>
            ) : (
              <Drag_input_field
                onDrop={(data: any) => handleDrop(data, "pdf", "invoice")}
                type="application/pdf"
              />
            )}
          </CardBody>
        </Card>

        <Card className="mt-4">
          <CardBody>
            <p className="my-4">Doket Upload</p>
            {field_visible[1] ? (
              <div className="flex  w-full flex-wrap  gap-2">
                {item_doket.map((item: any, index: number) => (
                  <>
                    <div key={index} className="w-full">
                      <Image_card
                        item={item}
                        index={index}
                        onDelete={() => handleDelete(index, "doket")}
                      />
                    </div>
                    <Divider />
                    <Button
                      className="bg-black mt-2 text-white"
                      onClick={() => View_file_handler(item)}
                    >
                      View PDF
                    </Button>
                  </>
                ))}
              </div>
            ) : (
              <Drag_input_field
                onDrop={(data: any) => handleDrop(data, "pdf", "doket")}
                type="application/pdf"
              />
            )}
          </CardBody>
        </Card>
        <Card className="mt-4">
          <CardBody>
            <p className="my-4">Payment image Upload</p>
            {field_visible[2] ? (
              <div className="flex  w-full flex-wrap  gap-2">
                {item_image.map((item: any, index: number) => (
                  <>
                    <div key={index} className="w-full">
                      <Image_card
                        item={item}
                        index={index}
                        onDelete={() => handleDelete(index, "image")}
                      />
                    </div>
                    <Divider />
                    <Button
                      className="bg-black mt-2 text-white"
                      onClick={() => View_file_handler(item)}
                    >
                      View Image
                    </Button>
                  </>
                ))}
              </div>
            ) : (
              <Drag_input_field
                onDrop={(data: any) => handleDrop(data, "image", "payment")}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
