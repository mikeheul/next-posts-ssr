"use server";

import { prisma } from "@/app/db/prisma";

// Paramètres de la fonction : on suppose qu'on reçoit un `userId` pour associer le post à un utilisateur
export async function createPost(title: string, content: string, userId: string) {
    try {
        // Création d'un nouveau post avec un utilisateur associé
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                userId, // Associer le post à un utilisateur spécifique
            },
        });

        return newPost;
    } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la création du post :", error);
        throw new Error("Impossible de créer le post. Veuillez réessayer plus tard.");
    }
}