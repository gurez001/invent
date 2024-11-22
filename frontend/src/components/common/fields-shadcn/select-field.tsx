import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

// Dropdown option type
type DropdownOption = { key: string; value: string };

interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
  label?: string; // Optional field label
  placeholder?: string; // Custom placeholder
  drop_down_selector: DropdownOption[]; // Dropdown options
  class_style?: string;
}

const SelectFields = <T extends FieldValues>({
  control,
  errors,
  name,
  label,
  placeholder = "Select category", // Default placeholder
  drop_down_selector,
  class_style,
}: SelectFieldProps<T>) => {
  let errorMessage: string | undefined;

  // Check for nested errors
  if (name.includes(".")) {
    const nameParts = name.split(".");
    const parentKey = nameParts[0];
    const childKey = nameParts[1];
    const parentErrors = errors[parentKey] as FieldErrors<T>;
    if (parentErrors && parentErrors[childKey]) {
      errorMessage = (parentErrors[childKey] as { message?: string }).message;
    }
  } else {
    errorMessage = (errors[name] as { message?: string })?.message;
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value || ""} value={field.value || ""}>
          <SelectTrigger className={`w-full ${class_style}`}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {drop_down_selector.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default SelectFields;
