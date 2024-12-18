import { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AnimeFormValues } from "@/zod-schemas/anime/animeSchema"

interface SeasonFormProps {
  form: UseFormReturn<AnimeFormValues>
  seasonIndex: number
}

export function SeasonForm() {
  return (
    <div className="space-y-4">
      demo
    </div>

  )
}

