import api from "../api/api";

const get = () => {
    return api.get("/auth/")
        .then(res => res.data)
}

const register = (email, username, password, is_admin) => {
    return api.post("auth/register", {
        email,
        username,
        password,
        is_admin
    }).then(res => res.data)
}

const login = (username, password) => {
    return api.post("/auth/login", {
        username,
        password
    }).then(res => res.data);
}
const logout = () => {
    return api.post("/auth/logout")
        .then(res => res.data);
}
const deleteUser = (password) => {
    return api.delete('/auth/user', {
        data: {
            password
        }
    }).then(res => res.data);
}

const AuthApi = {get, register, logout, login, deleteUser};

export default AuthApi;