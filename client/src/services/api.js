import axios from "axios";

// Axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 🔄 POST SERVICES
export const postService = {
  getAllPosts: async (page = 1, limit = 10, category = null) => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) url += `&category=${category}`;
    const res = await api.get(url);
    return res.data;
  },

  getPost: async (idOrSlug) => {
    const res = await api.get(`/posts/${idOrSlug}`);
    return res.data;
  },

  createPost: async (postData) => {
    const res = await api.post("/posts", postData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  updatePost: async (id, postData) => {
    const res = await api.put(`/posts/${id}`, postData);
    return res.data;
  },

  deletePost: async (id) => {
    const res = await api.delete(`/posts/${id}`);
    return res.data;
  },

  addComment: async (postId, commentData) => {
    const res = await api.post(`/posts/${postId}/comments`, commentData);
    return res.data;
  },

  searchPosts: async (query) => {
    const res = await api.get(`/posts/search?q=${query}`);
    return res.data;
  },
};

// 🏷️ CATEGORY SERVICES
export const categoryService = {
  getAllCategories: async () => {
    const res = await api.get("/categories");
    return res.data;
  },

  createCategory: async (categoryData) => {
    const res = await api.post("/categories", categoryData);
    return res.data;
  },
};

// 🔐 AUTH SERVICES
export const authService = {
  register: async (userData) => {
    const res = await api.post("/auth/register", userData);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  },

  login: async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

export default api;
