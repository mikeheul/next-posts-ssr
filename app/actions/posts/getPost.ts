import { prisma } from "@/app/db/prisma";
import { Post } from "../../types";

export async function getPost(postId: string): Promise<Post | null> {
    return await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            user: true,
            comments: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })
}