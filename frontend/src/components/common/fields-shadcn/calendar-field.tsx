import { Input } from "@/components/ui/input";
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
} from "react-hook-form";

interface CalendarFieldProps<T extends FieldValues> {
    control: Control<T>;
    errors: FieldErrors<T>;
    name: Path<T>;
    label: string;
    inputStyle?: string;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
    disabledPath?: boolean;
}

const CalendarField = <T extends FieldValues>({
    control,
    errors,
    name,
    label,
    inputStyle,
    handleInputChange,
    maxLength,
    disabledPath = false
}: CalendarFieldProps<T>) => {
    let errorMessage: string | undefined;

    if (name.includes(".")) {
        const [parentKey, childKey] = name.split(".");
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
                <div>
                    <Input
                        placeholder={label}
                        type="date"
                        className={inputStyle}
                        disabled={disabledPath}
                        {...field}
                        onChange={(e) => {
                            handleInputChange?.(e);
                            field.onChange(e);
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

export default CalendarField;

