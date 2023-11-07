import api from "@/api/api";

const ResetPasswordEmail = (email) => {

    return api.post('/user/forgotPassword', {
        email
    }).then(res => res.data)
}
const ResetPasswordEmailSendNewPassword = (email, token, password) => {
    return api.post('/user/resetPassword', {
        email, token, password,
    }).then(res => res.data)
}
const ChangePassword = (user_id, old_password, new_password) => {
    return api.put('/user/password', {
        user_id, old_password, new_password
    }).then(res => res.data)
}
const GetAllUsers = () => {
    return api.get('/user/all').then(res => res.data)
}
const ChangeUsername = (newUsername, userId) => {
    return api.put('/user/username', {
        username: newUsername, user_id: userId,
    }).then(res => res.data)
}
const ChangeEmail = (email, password, user_id) => {
    return api.put('/user/email', {
        email, password, user_id,
    }).then(res => res.data)
}
const DeleteUser = (id) => {
    return api.delete('/user/', {
        data: {
            user_id: id
        }
    })
}
const UserApi = {
    DeleteUser,
    ChangeUsername,
    ChangeEmail,
    ResetPasswordEmail,
    ResetPasswordEmailSendNewPassword,
    ChangePassword,
    GetAllUsers,
}
export default UserApi;