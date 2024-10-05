// "use client";
// import Autocomplete_field from "@/components/common/fields/Autocomplete_field";
// import Input_field from "@/components/common/fields/Input_field";
// import Secondary_Autocomplete_field from "@/components/common/fields/Secondary_Autocomplete_field";
// import Secondary_select_Field from "@/components/common/fields/Secondary_select_Field";
// import Select_field from "@/components/common/fields/Select_field";
// import Drag_input_field from "@/components/image_compress/Drag_input_field";
// import Image_card from "@/components/image_compress/Image_card";
// import { Button, ModalFooter, ModalHeader } from "@nextui-org/react";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// interface vender_form_props {
//   set_open: (value: boolean) => void;
//   onsubmit: (data: any) => void;
// }
// const status = [
//   { label: "Active", value: "active" },
//   { label: "Inactive", value: "inactive" },
// ];
// const gst = [
//   {
//     value: 0,
//     label_1: 0,
//     label_2: "(0% CGST & 0% SGST & 0% IGST)",
//   },
//   {
//     value: 0.1,
//     label_1: 0.1,
//     label_2: "(0.05% CGST & 0.05% SGST & 0.1% IGST)",
//   },
//   {
//     value: 0.25,
//     label_1: 0.25,
//     label_2: "(0.125% CGST & 0.125% SGST & 0.25% IGST)",
//   },
//   {
//     value: 1,
//     label_1: 1,
//     label_2: "(0.5% CGST & 0.5% SGST & 1% IGST)",
//   },
//   {
//     value: 1.5,
//     label_1: 1.5,
//     label_2: "(0.75% CGST & 0.75% SGST & 1.5% IGST)",
//   },
//   {
//     value: 3,
//     label_1: 3,
//     label_2: "(1.5% CGST & 1.5% SGST & 3% IGST)",
//   },
//   {
//     value: 5,
//     label_1: 5,
//     label_2: "(2.5% CGST & 2.5% SGST & 5% IGST)",
//   },
//   {
//     value: 6,
//     label_1: 6,
//     label_2: "(3% CGST & 3% SGST & 6% IGST)",
//   },
//   {
//     value: 7.5,
//     label_1: 7.5,
//     label_2: "(3.75% CGST & 3.75% SGST & 7.5% IGST)",
//   },
//   {
//     value: 12,
//     label_1: 12,
//     label_2: "(6% CGST & 6% SGST & 12% IGST)",
//   },

//   {
//     value: 18,
//     label_1: 18,
//     label_2: "(9% CGST & 9% SGST & 18% IGST)",
//   },
//   {
//     value: 28,
//     label_1: 28,
//     label_2: "(14% CGST & 14% SGST & 28% IGST)",
//   },
// ];
// const Primary_units = [
//   { value: "oth", label: "OTH OTHERS" },
//   { value: "pcs", label: "PCS PIECES" },
//   { value: "nos", label: "NOS NUMBERS" },
//   { value: "kgs", label: "KGS KILOGRAMS" },
//   { value: "unt", label: "UNT UNITS" },
//   { value: "box", label: "BOX BOX" },
//   { value: "ltr", label: "LTR LITER" },
//   { value: "pac", label: "PAC PACKS" },
//   { value: "each", label: "EACH EACH" },
//   { value: "mtr", label: "MTR METER" },
//   { value: "set", label: "SET SETS" },
//   { value: "sqf", label: "SQF SQUARE FEET" },
//   { value: "poch", label: "POCH POUCH" },
//   { value: "btl", label: "BTL BOTTLES" },
//   { value: "bag", label: "BAG BAGES" },
//   { value: "case", label: "CASE CASE" },
//   { value: "lad", label: "LAD LADI" },
//   { value: "jar", label: "JAR JARS" },
//   { value: "pet", label: "PET PETI" },
//   { value: "ft", label: "FT FEET" },
//   { value: "gsm", label: "GSM GRAMS" },
//   { value: "tbs", label: "TBS TABLETS" },
//   { value: "strp", label: "STRP STRIPS" },
//   { value: "rol", label: "ROL ROLLS" },
//   { value: "coil", label: "COIL COIL" },
//   { value: "doz", label: "DOZ DOZEN" },
//   { value: "qtl", label: "QTL QUINTAL" },
//   { value: "prs", label: "PRS PAIRS" },
//   { value: "none", label: "NONE NONE" },
//   { value: "bars", label: "BARS BARS" },
//   { value: "bor", label: "BOR BORA" },
// ];
// const Product_form: React.FC<vender_form_props> = ({ set_open, onsubmit }) => {
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();
//   const [files, setFiles] = useState<File[]>([]);
//   const [itemData, setItemData] = useState<{ img: string; name: string }[]>([]);

//   const handleDrop = (acceptedFiles: File[]) => {
//     const imageData = acceptedFiles.map((file) => ({
//       img: URL.createObjectURL(file),
//       name: file.name,
//     }));
//     setFiles(acceptedFiles);
//     setItemData(imageData);
//   };

//   const handleDelete = (index: number) => {
//     const newImages = files.filter((_, i) => i !== index);
//     const imageData = newImages.map((file) => ({
//       img: URL.createObjectURL(file),
//       name: file.name,
//     }));
//     setFiles(newImages);
//     setItemData(imageData);
//   };

//   return (
//     <div>
//       <div>
//         <ModalHeader className="flex flex-col gap-1">
//           {/* {edit ? "Update Vender From" : "Vender From"} */}
//         </ModalHeader>
//         <form onSubmit={handleSubmit(onsubmit)}>
//           <div className="flex  items-center justify-between p-2">
//             <p className="text-lg">Basic Details</p>
//             <div className="w-52">
//               <Select_field
//                 control={control}
//                 errors={errors}
//                 name="status"
//                 label="select status"
//                 options={status}
//               />
//             </div>
//           </div>
//           <div className="bg-white">
//             <div className="flex flex-wrap gap-2">
//               <div className="w-full">
//                 <Input_field
//                   control={control}
//                   errors={errors}
//                   name="name"
//                   label="Item Name"
//                 />
//               </div>
//               <div className="w-[49%]">
//                 <Input_field
//                   control={control}
//                   errors={errors}
//                   name="selling_price"
//                   label="Selling Price"
//                 />
//               </div>
//               <div className="w-[49%]">
//                 <Secondary_select_Field
//                   control={control}
//                   errors={errors}
//                   name="gst"
//                   label="Tax %"
//                   options={gst}
//                 />
//               </div>
//               <div className="w-[49%]">
//                 <Secondary_Autocomplete_field
//                   control={control}
//                   errors={errors}
//                   name="primary_unit"
//                   label_name="Primary Unit"
//                   options={Primary_units}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="w-full">
//             <p className="text-lg py-2">Additional Information OPTIONAL</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <div className="w-[49%]">
//               <Input_field
//                 control={control}
//                 errors={errors}
//                 name="hsn"
//                 label="HSN/ SAC"
//               />
//             </div>
//             <div className="w-[49%]">
//               <Input_field
//                 control={control}
//                 errors={errors}
//                 name="purchase_price"
//                 label="Purchase Price"
//               />
//             </div>
//             <div className="w-[49%]">
//               <div className="flex">
//                 <Input_field
//                   control={control}
//                   errors={errors}
//                   name="purchase_price"
//                   label="Purchase Price"
//                 />
//               </div>
//               <div>
//                 <Button>Auto Generate</Button>
//               </div>
//             </div>
//             <div className="w-[49%]">
//               <Secondary_Autocomplete_field
//                 control={control}
//                 errors={errors}
//                 name="category"
//                 label_name="Category"
//                 options={Primary_units}
//               />
//             </div>
//             <div className="w-full">
//               <p className="text-lg py-2">Product Image</p>
//               <div>
//                 <div className=" w-full p-4 lg:w-3/12 lg:p-2">
//                   <div>
//                     <Drag_input_field onDrop={handleDrop} />
//                     <p>
//                       Upto 5 images. Product images must be PNG or JPEG,
//                       recommended 1024 px by 1024 px or 1:1 aspect ratio.
//                     </p>
//                   </div>
//                   <div>
//                     <Image_card itemData={itemData} onDelete={handleDelete} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div>
//             <ModalFooter>
//               <Button
//                 color="danger"
//                 variant="light"
//                 onPress={() => set_open(false)}
//               >
//                 Close
//               </Button>

//               <Button
//                 isLoading={false}
//                 className="bg-black text-white"
//                 type="submit"
//               >
//                 Save
//               </Button>
//             </ModalFooter>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Product_form;
