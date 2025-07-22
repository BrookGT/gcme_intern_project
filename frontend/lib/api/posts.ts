import { baseApi } from "./base";

export async function getAllPosts() {
    const response = await baseApi.get("/posts");
    return response.data;
}

export async function getPostById(id: string | number) {
    const response = await baseApi.get(`/posts/${id}`);
    return response.data;
}

export async function getMyPosts() {
    const response = await baseApi.get("/posts/me");
    return response.data;
}

export async function createPost(data: {
    title: string;
    content: string;
    published: boolean;
}) {
    const response = await baseApi.post("/posts", data);
    return response.data;
}

export async function updatePost(
    id: string | number,
    data: { title?: string; content?: string; published?: boolean }
) {
    const response = await baseApi.patch(`/posts/${id}`, data);
    return response.data;
}

export async function deletePost(id: string | number) {
    const response = await baseApi.delete(`/posts/${id}`);
    return response.data;
}
