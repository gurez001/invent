import { Input } from "@/components/ui/input";
import React from "react";

import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
} from "react-hook-form";

// Updated SelectFieldProps with generics
interface SelectFieldProps<T extends FieldValues> {
    control: Control<T>;
    errors: FieldErrors<T>;
    name: Path<T>; // Ensure name is a valid path in T
    label: string; // Label for the select field
    type?: string; // Label for the select field
    inputStyle?: string;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional onChange handler
    maxLength?: number;
    disabled_path?: boolean;
}

const Input_field = <T extends FieldValues>({
    control,
    errors,
    name,
    label,
    type = "text",
    inputStyle,
    handleInputChange,
    maxLength, disabled_path = false
}: SelectFieldProps<T>) => {
    let errorMessage: string | undefined;

    // Check if name contains a dot for nested errors
    if (name.includes(".")) {
        const nameParts = name.split(".");
        const parentKey = nameParts[0]; // e.g., 'shipping_address'
        const childKey = nameParts[1]; // e.g., 'city'

        // Check if the parent key exists in errors
        const parentErrors = errors[parentKey] as FieldErrors<T>;
        if (parentErrors && parentErrors[childKey]) {
            errorMessage = (parentErrors[childKey] as { message?: string }).message;
        }
    } else {
        // Accessing direct errors
        errorMessage = (errors[name] as { message?: string })?.message;
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div>
                    <Input
                        placeholder={label}
                        type={type}
                        className={inputStyle}
                        disabled={disabled_path}
                        {...field}
                        onChange={(e) => {
                            const value = type === "number" ? parseFloat(e.target.value) || null : e.target.value;
                            handleInputChange?.(e);
                            field.onChange(value);
                        }}
                        maxLength={maxLength}
                    />

                    {errorMessage && (
                        <p className="text-red-600 text-s pt-[3px]">{errorMessage}</p>
                    )}
                </div>
            )}
        />
    );
};

export default Input_field;
