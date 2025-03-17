import { prisma } from "@/app/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const posts = await prisma.post.findMany({
        include: {
            user: true,
            comments: true
        },
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
}
