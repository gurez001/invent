"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, Link2Icon, FileTextIcon } from "lucide-react";
import { PostForm } from "@/components/post/index-form";
import CategorySelector from "@/components/post/post-categorie";
import { ScrollArea } from "@/components/ui/scroll-area";
import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Image_card from "@/components/image_compress/Image_card";
import Seo_form from "@/components/common/seo/seo";
import { useState } from "react";

interface PostFromCardProps {
  imageitemData?: { img: string; name: string }[]; // Corrected to match the useState structure
  handleDrop?: any;
  errors?: any; // react form
  control?: any; // react form
  setValue?: any; // react form
  watch?: any; // react form
  setKeywords: any;
  keywords: any;
  selectedCategories: any;
  setSelectedCategories: any;
  isVisiableCategory?: boolean;
  pageTitle:string
}
export default function PostFromCard({
  imageitemData,
  handleDrop,
  setValue,
  control,
  errors,
  watch,
  keywords,
  setKeywords,
  selectedCategories,
  setSelectedCategories,
  isVisiableCategory = true,
  pageTitle
}: PostFromCardProps) {
  const [postType, setPostType] = useState<string>(pageTitle);

  const handleDelete = (index: number) => {
    // const newImages = files.filter((_: any, i: number) => i !== index);
    // const imageData = newImages.map((file: any) => ({
    //     img: URL.createObjectURL(file),
    //     name: file.name,
    // }));
    // // setFiles(newImages);
    // setItemData(imageData);
  };

  return (
    <div className="min-h-screen text-white p-4">
      <Card className="mx-auto bg-black border-zinc-800">
        <CardContent className="p-6">
          <div className="block lg:flex gap-4">
            {/* Left Panel: Post Creation */}
            <div className="w-full lg:w-[70%]">
              <h1 className="text-gray-200 text-2xl">Create a new {pageTitle}</h1>
              <Tabs
                value={postType}
                onValueChange={setPostType}
                className="mb-6"
              >
                <TabsList className="bg-gray-700 my-2">
                  {[
                    { value: pageTitle, label: pageTitle, icon: FileTextIcon },
                    { value: "image", label: "Image", icon: ImageIcon },
                    { value: "seo", label: "SEO", icon: Link2Icon },
                  ].map(({ value, label, icon: Icon }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="data-[state=active]:bg-white hover:bg-gray-400 hover:text-black m-[2px]"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={pageTitle}>
                  <PostForm
                    control={control}
                    errors={errors}
                    setValue={setValue}
                  />
                </TabsContent>

                <TabsContent value="image">
                  <Drag_input_field onDrop={handleDrop} color_class={"white"} />
                </TabsContent>

                <TabsContent value="seo">
                  <Seo_form
                    control={control}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    setKeywords={setKeywords}
                    keywords={keywords}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Panel: Sharing Options */}
            <div className="w-full lg:w-[30%]">
              {isVisiableCategory && (
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <CategorySelector
                    class_cat={"text-gray-200"}
                    setSelectedCategories={setSelectedCategories}
                    selectedCategories={selectedCategories}
                  />
                </ScrollArea>
              )}

              {imageitemData ? (
                <div className="text-gray-200 my-2 bg-black w-full rounded-md border p-4">
                  <h3 className="text-xl">Feature Image</h3>
                  <div className="flex w-full flex-wrap my-2 gap-2">
                    {imageitemData.map((item, index) => (
                      <div key={index} className="w-[100%]">
                        <Image_card
                          item={item}
                          index={index}
                          onDelete={handleDelete}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <FooterActions />
        </CardContent>
      </Card>
    </div>
  );
}

function FooterActions() {
  return (
    <div className="flex justify-between mt-6 pt-6 border-t border-zinc-800">
      <Button variant="ghost" className="text-zinc-400">
        Discard
      </Button>
      <div className="space-x-2">
        <Button variant="outline" className="bg-transparent border-zinc-700">
          Save draft
        </Button>
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
          Post
        </Button>
      </div>
    </div>
  );
}
