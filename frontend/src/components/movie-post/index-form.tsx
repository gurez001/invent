import Input_field from "../common/fields-shadcn/input-field";
import { Label } from "@/components/ui/label"
import Custom_Text_Editor_field from "../common/fields-shadcn/custom-text-editor";
import SelectFields_2 from "../common/fields-shadcn/select-field-2";
import CalendarField from "../common/fields-shadcn/calendar-field";
import { AgeRating, AnimeStatus, Rating } from "@/zod-schemas/anime/movieSchema";

// Type the form hook using zod schema
interface PostFormProps {
    control: any;
    setValue: any;
    errors: any;
}
export function PostForm({ control, setValue, errors }: PostFormProps) {
    return (
        <>
            <div className="my-4">
                <Label htmlFor={"Title"} className="text-gray-200 text-base">Title</Label>
                <Input_field control={control}
                    errors={errors}
                    name={"title"}
                    label={"Enter post title"}
                    inputStyle={"text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"}
                />
            </div>
            <div className="my-4">
                <Label htmlFor={"Description"} className="text-gray-200 text-base">Description</Label>
                <Input_field control={control}
                    errors={errors}
                    name={"description"}
                    label={"Enter post description"}
                    inputStyle={"text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"}
                />
            </div>

            <div className="my-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div >
                    <Label htmlFor={"Duration (minutes)"} className="text-gray-200 text-base">Duration (minutes)</Label>
                    <Input_field control={control}
                        errors={errors}
                        name={"duration"}
                        label={"Enter post Duration"}
                        type="number"
                        inputStyle={"text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"}
                    />
                </div>
                <div >
                    <Label htmlFor={"airedFrom"} className="text-gray-200 text-base">Aired From</Label>
                    <CalendarField control={control}
                        errors={errors}
                        name={"airedFrom"}
                        label={"Aired From"}
                        inputStyle={"text-gray-800 placeholder-gray-800 bg-gray-400 border-zinc-300 pr-10"}
                    />
                </div>
                <div >
                    <Label htmlFor={"airedTo"} className="text-gray-200 text-base">Aired to optional</Label>
                    <CalendarField control={control}
                        errors={errors}
                        name={"airedTo"}
                        label={"airedTo"}
                        inputStyle={"text-gray-800 placeholder-gray-800 bg-gray-400 border-zinc-300 pr-10"}
                    />
                </div>
                <div >
                    <Label htmlFor={"Score"} className="text-gray-200 text-base">Score (0-10) optional</Label>
                    <Input_field control={control}
                        errors={errors}
                        name={"score"}
                        label={"Score"}
                        type="number"
                        inputStyle={"text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"}
                    />
                </div>
            </div>
            <div className="my-4 flex gap-4">

                <div className="w-[200px]">
                    <Label htmlFor={"rating"} className="text-gray-200 text-base">Rating</Label>
                    <SelectFields_2
                        control={control}
                        errors={errors}
                        name="rating"
                        drop_down_selector={Rating}
                        class_style={"text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"}
                    />
                </div>
                <div className="w-[200px]">
                    <Label htmlFor={"AgeRating"} className="text-gray-200 text-base">Age Rating</Label>
                    <SelectFields_2
                        control={control}
                        errors={errors}
                        name="ageRating"
                        drop_down_selector={AgeRating}
                        class_style={"text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"}
                    />
                </div>
                <div className="w-[200px]">
                    <Label htmlFor={"status"} className="text-gray-200 text-base">Status</Label>
                    <SelectFields_2
                        control={control}
                        errors={errors}
                        name="status"
                        drop_down_selector={AnimeStatus}
                        class_style={"text-gray-300 placeholder-gray-200 bg-transparent border-zinc-300"}
                    />
                </div>
            </div>
            <div className="my-4">
                <Label htmlFor={"Content"} className="text-gray-200 text-base">Content</Label>
                <Custom_Text_Editor_field control={control}
                    errors={errors}
                    name={"content"}
                    setValue={setValue}
                />
            </div>

        </>
    );
}
