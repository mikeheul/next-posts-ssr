import { prisma } from "@/app/db/prisma";
import { Post } from "../../types";

export async function getPosts(): Promise<Post[]> {
    return await prisma.post.findMany({
        include: {
            user: true,
            comments: true,
        },
        orderBy: { createdAt: "desc" },
    });
}