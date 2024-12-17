import { z } from "zod";

// Enum definitions
export enum Rating {
    G = "G",
    PG = "PG",
    PG13 = "PG-13",
    R = "R",
    NC17 = "NC-17",
}

export enum AnimeStatus {
    FINISHED = "Finished",
    ONGOING = "Ongoing",
    UPCOMING = "Upcoming",
}

export enum AgeRating {
    G = "G",
    PG = "PG",
    R = "R",
}

// Form schema
export const MovieformSchema = z.object({
    title: z.string().min(1, "Title is required"),
    publish_status: z.string(),
    description: z.string().min(1, "Description is required"),
    rating: z.nativeEnum(Rating),
    duration: z.number().min(1, "Duration must be at least 1 minute"),
    airedFrom: z.string().min(1, "Aired From date is required"),
    airedTo: z.string().optional(),
    status: z.nativeEnum(AnimeStatus),
    score: z.number().min(0).max(10).optional(),
    ageRating: z.nativeEnum(AgeRating),
    content: z.string().min(20, { message: "Content must be at least 20 characters long." }),
});
