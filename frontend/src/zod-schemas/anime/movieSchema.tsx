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
    publish_status: z.string(),
    rating: z.nativeEnum(Rating),
    duration: z.number().min(1, "Duration must be at least 1 minute"),
    airedFrom: z.string().min(1, "Aired From date is required"),
    airedTo: z.string().optional(),
    status: z.nativeEnum(AnimeStatus),
    score: z.number().min(0).max(10).optional(),
    ageRating: z.nativeEnum(AgeRating),
    title: z.string().min(5, { message: "Title must be at least 5 characters long." }),
    description: z.string().min(5, { message: "Title must be at least 5 characters long." }),
    content: z.string().min(20, { message: "Content must be at least 20 characters long." }),
    metaTitle: z.string().min(10, { message: "Meta title must be at least 10 characters long." }).max(60, { message: "Meta title must not exceed 60 characters." }).optional(),
    metaDescription: z.string().min(50, { message: "Meta description must be at least 50 characters long." }).max(160, { message: "Meta description must not exceed 160 characters." }).optional(),
    metaCanonicalUrl: z.string()
    .regex(/^[a-zA-Z0-9-_\/\.]*$/, {
            message: "The string contains invalid characters. Only letters, numbers, hyphens, underscores, and slashes are allowed.",
        })
});
