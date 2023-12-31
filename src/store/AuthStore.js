import {computed, ref, watch} from "vue";
import AuthApi from "@/api/AuthApi";

const user = ref();

const userId = ref();
const username = ref();
const userEmail = ref()
const isAdmin = ref(false)

watch(user, (val) => {
    if (val !== undefined) {
        userId.value = val.id;
        username.value = val.username;
        userEmail.value = val.email
        isAdmin.value = val.is_admin;
    }
}, {deep: true});

const token = ref();

const tokenGetter = computed(() => token.value);

if (localStorage.getItem("token") !== null) {
    token.value = localStorage.getItem("token");
}

const login = (username, password) => {
    return AuthApi.login(username, password)
        .then(res => {
            token.value = res.token;
            localStorage.setItem("token", res.token);
            user.value = res.user;
        });
}

const fetchUser = () => {
    return AuthApi.get()
        .then(res => {
            user.value = res;
        })
}

const register = (email, username, password, is_admin) => {
    return AuthApi.register(email, username, password, is_admin)
        .then(res => {
            user.value = res.user;
            token.value = res.token;
            localStorage.setItem("token", res.token);
        })
}

const logout = () => {
    return AuthApi.logout()
        .then(res => {
            user.value = res.user;
            localStorage.removeItem("token");
        })
}
const deleteUser = (password) => {
    return AuthApi.deleteUser(password.value)
        .then(res => {
            user.value = res.user;
            localStorage.removeItem("token");
        })
}

const AuthStore = {
    userEmail,
    userId,
    username,
    isAdmin,
    login,
    fetchUser,
    register,
    logout,
    token: tokenGetter,
    deleteUser
};

export default AuthStore;