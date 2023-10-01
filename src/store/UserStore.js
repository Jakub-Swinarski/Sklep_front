import UserApi from "@/api/UserApi";

import AuthStore from "@/store/AuthStore";

const ResetPasswordEmail = (email) => {
    return UserApi.ResetPasswordEmail(email)
}
const ResetPasswordEmailSendNewPassword = (email, token, password) => {
    return UserApi.ResetPasswordEmailSendNewPassword(email, token, password)
}
const ChangePassword = (old_password, new_password) => {
    return UserApi.ChangePassword(AuthStore.userId.value, old_password, new_password)
}
const UserStore = {
    ChangePassword, ResetPasswordEmail, ResetPasswordEmailSendNewPassword
}
export default UserStore;