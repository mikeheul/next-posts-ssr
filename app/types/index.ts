export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    posts?: Post[];
    comments?: Comment[];
}

export interface Post {
    id: string;
    title: string;
    content: string;
    user: User;
    userId: string;
    comments?: Comment[];
    createdAt: Date;
}

export interface Comment {
    id: string;
    content: string;
    post?: Post;
    postId: string;
    user?: User;
    userId: string;
    createdAt: Date;
}