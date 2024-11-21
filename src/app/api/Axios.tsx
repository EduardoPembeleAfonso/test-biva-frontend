import axios from "axios";
export const TOKEN_KEY = "my-jwt-token";
export const AUTHOR_KEY = "my-data-author";
export const TOKEN_ID = "my-token-id";
export const API_URL = "https://test-biva-backend.onrender.com/v1";

let token;
let authorId: string | null = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem(TOKEN_KEY)?.replace(/"/g, "");
  authorId = localStorage.getItem(TOKEN_ID);
}

const Api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: `Bearer ${token}`,
  },
});

export { Api, authorId };
