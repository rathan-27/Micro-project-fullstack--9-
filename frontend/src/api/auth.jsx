import API from "./http";

export const login = async (username, password) => {
    const res = await API.post("auth/login/", { username, password });
    localStorage.setItem("token", res.data.access);
    return res.data;
};

export const register = (username, password) => {
    return API.post("auth/register/", { username, password });
};
