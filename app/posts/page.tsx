import Link from "next/link";
import { Post } from "../types";
import { getPosts } from "../actions/posts/getPosts";

export default async function PostsPage() {
    const posts: Post[] = await getPosts();

    return (
        <div className="container mx-auto p-6">
        {/* Section d'en-tête avec le titre et le bouton */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Liste des posts</h1>
            <Link href="/posts/create-post">
            <button className="bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-200">
                Créer un nouveau post
            </button>
            </Link>
        </div>

        {/* Liste des posts */}
        <ul className="space-y-4">
            {posts.map((post) => (
            <li key={post.id} className="border border-gray-300 rounded-lg shadow-sm p-4 hover:shadow-lg transition duration-200">
                <Link href={`/posts/${post.id}`}>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                    <p className="text-gray-700">{post.content}</p>
                </Link>
            </li>
            ))}
        </ul>
        </div>
    );
}
