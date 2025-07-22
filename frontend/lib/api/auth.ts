import { baseApi } from "./base";

export async function signIn(email: string, password: string) {
    const response = await baseApi.post("/auth/signin", { email, password });
    return response.data;
}

export async function signUp(email: string, password: string, name?: string) {
    const response = await baseApi.post("/auth/signup", {
        email,
        password,
        name,
    });
    return response.data;
}

export async function logout() {
    const response = await baseApi.post("/auth/logout");
    return response.data;
}

export async function getMe() {
    const response = await baseApi.get("/auth/me");
    return response.data;
}
