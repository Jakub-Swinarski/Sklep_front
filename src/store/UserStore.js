import UserApi from "@/api/UserApi";

import AuthStore from "@/store/AuthStore";
import {ref} from "vue";
const allUsers = ref([])

const ResetPasswordEmail = (email) => {
    return UserApi.ResetPasswordEmail(email)
}
const ResetPasswordEmailSendNewPassword = (email, token, password) => {
    return UserApi.ResetPasswordEmailSendNewPassword(email, token, password)
}
const ChangePassword = (old_password, new_password) => {
    return UserApi.ChangePassword(AuthStore.userId.value, old_password, new_password)
}
const GetAllUsers = async ()=>{
    return  UserApi.GetAllUsers
        .then(res => allUsers.value = res)
}
const UserStore = {
    ChangePassword, ResetPasswordEmail, ResetPasswordEmailSendNewPassword,GetAllUsers,allUsers
}
export default UserStore;