import API from "./http";

/* ------------------------
   LOGIN USER
------------------------ */
export const login = async (username, password) => {
    const res = await API.post("/auth/login/", {
        username,
        password,
    });

    // Save tokens
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    localStorage.setItem("username", username);

    return res.data;
};

/* ------------------------
   REGISTER USER
------------------------ */
export const register = async (username, email, password) => {
    return API.post("/auth/register/", {
        username,
        email,
        password,
    });
};
