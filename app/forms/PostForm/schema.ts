import { z } from "zod";

// Schéma pour la validation d'un post
export const postSchema = z.object({
    title: z.string().min(3, "Le titre doit faire au moins 3 caractères").max(100, "Le titre est trop long"),
    content: z.string().min(10, "Le contenu doit faire au moins 10 caractères").max(5000, "Le contenu est trop long"),
});

export type PostInput = z.infer<typeof postSchema>;
