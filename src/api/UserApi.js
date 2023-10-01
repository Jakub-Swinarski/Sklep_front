import api from "@/api/api";

const ResetPasswordEmail = (email) => {

    return api.post('/forgotPassword', {
        email
    }).then(res => res.data)
}
const ResetPasswordEmailSendNewPassword = (email, token, password) => {
    return api.post('/resetPassword', {
        email, token, password,
    }).then(res => res.data)
}
const ChangePassword = (user_id, old_password, new_password) => {
    return api.put('/changePassword', {
        id: user_id, old_password, new_password
    }).then(res => res.data)
}

const UserApi = {
    ResetPasswordEmail, ResetPasswordEmailSendNewPassword, ChangePassword,
}
export default UserApi;