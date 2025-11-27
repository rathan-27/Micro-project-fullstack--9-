import axios from "axios";

const http = axios.create({
    baseURL: "/api",


});

/* -------------------------
   1. Attach Access Token
------------------------- */
http.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/* -------------------------
   2. Auto Refresh Token
------------------------- */
let refreshing = false;
let queue = [];

const processQueue = (error, token = null) => {
    queue.forEach((p) => {
        if (error) p.reject(error);
        else p.resolve(token);
    });
    queue = [];
};

http.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {

            const refresh = localStorage.getItem("refresh");
            if (!refresh) {
                logoutUser();
                return Promise.reject(err);
            }

            if (refreshing) {
                return new Promise((resolve, reject) => {
                    queue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return http(originalRequest);
                    })
                    .catch((e) => Promise.reject(e));
            }

            originalRequest._retry = true;
            refreshing = true;

            try {
                // ✅ FIXED REFRESH URL (NO MORE LOCALHOST)
                const { data } = await axios.post(
                    "http://127.0.0.1:8000/api/auth/refresh/",
                    { refresh }
                );

                const newAccess = data.access;
                localStorage.setItem("access", newAccess);

                processQueue(null, newAccess);

                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                return http(originalRequest);
            } catch (e) {
                processQueue(e, null);
                logoutUser();
                return Promise.reject(e);
            } finally {
                refreshing = false;
            }
        }

        return Promise.reject(err);
    }
);

/* -------------------------
   3. Logout
------------------------- */
function logoutUser() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    window.location.href = "/login";
}

export default http;
