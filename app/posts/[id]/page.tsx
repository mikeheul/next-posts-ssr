import Link from "next/link";
import { getPost } from "@/app/actions/posts/getPost";

export default async function PostDetail({ params }: { params: { id: string } }) {
    const { id } = params;

    const post = await getPost(id);

    if (!post) {
        return (
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800">Post non trouvé</h1>
                <p>Le post que vous recherchez n&apos;existe pas ou a été supprimé.</p>
                <Link href="/">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                    Retour à la liste des posts
                </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            {/* En-tête du post */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
                <Link href="/posts">
                    <button className="bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                        Retour à la liste des posts
                    </button>
                </Link>
            </div>

            {/* Contenu du post */}
            <p className="text-gray-700 mb-4">{post.content}</p>
            <p className="text-sm text-gray-800">
                Posté par {post.user.name} le {new Date(post.createdAt).toLocaleDateString()}
            </p>

            {/* Commentaires */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Commentaires</h2>
                <ul className="space-y-4">
                {/* Vérification conditionnelle pour s'assurer que comments existe */}
                {post.comments?.length === 0 && <p>Aucun commentaire pour ce post.</p>}
                {post.comments?.map((comment) => (
                    <li key={comment.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200">
                        <p className="text-gray-900">{comment.content}</p>
                        <p className="text-sm text-gray-500">Par {comment.user?.name}</p>
                        <p className="text-xs text-gray-800">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}
