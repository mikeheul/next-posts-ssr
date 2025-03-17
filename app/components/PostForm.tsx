"use client";

import { useState } from "react";
import { createPost } from "@/app/actions/posts/postActions";
import { postSchema } from "@/app/forms/PostForm/schema";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            setErrors({});
            const validatedData = postSchema.parse({ title, content }); // Valide les données
            setIsSubmitting(true);
            await createPost(validatedData.title, validatedData.content, "67d7e50e44cd0ff9637172ce");

            router.push("/posts");

            setTitle("");
            setContent("");
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors: { title?: string; content?: string } = {};
                error.errors.forEach((err) => {
                validationErrors[err.path[0] as "title" | "content"] = err.message;
                });
                setErrors(validationErrors);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Créer un nouveau post</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Entrez le titre du post"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Content */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenu</label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Entrez le contenu du post"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Envoi..." : "Ajouter le post"}
                    </button>
                </div>
            </form>

            {/* Back Link */}
            <div className="mt-6 text-center">
                <Link href="/posts" className="text-blue-500 hover:text-blue-700">
                    Retour à la liste des posts
                </Link>
            </div>
        </div>
    );
}
