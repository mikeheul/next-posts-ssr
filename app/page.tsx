import Link from "next/link";

export default async function Home() {

    return (
        <div>
          <Link href="/posts">Liste des posts</Link>
        </div>
    )
}