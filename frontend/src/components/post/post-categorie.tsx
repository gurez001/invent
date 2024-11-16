"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  name: string;
};

const categories: Category[] = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Books" },
  { id: "3", name: "Clothing" },
  { id: "4", name: "Home & Garden" },
  { id: "5", name: "Toys & Games" },
];
interface categorie_props {
  class_cat: string;
  selectedCategories:any;
  setSelectedCategories:any;
}
export default function CategorySelector({ class_cat,setSelectedCategories,selectedCategories }: categorie_props) {


  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev:any) =>
      prev.includes(categoryId)
        ? prev.filter((id:any) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Selected category IDs:", selectedCategories);
    // Here you can perform any action with the selected category IDs
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className={`text-lg font-semibold ${class_cat}`}>
          Select Categories
        </h2>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              className="bg-gray-600 text-white border"
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={() => handleCategoryChange(category.id)}
            />
            <Label
              htmlFor={category.id}
              className={`${class_cat} text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
            >
              {category.name}
            </Label>
          </div>
        ))}
      </div>
      {selectedCategories.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">Selected Category IDs:</h3>
          <p className={`${class_cat} text-sm`}>
            {selectedCategories.join(", ")}
          </p>
        </div>
      )}
    </form>
  );
}
