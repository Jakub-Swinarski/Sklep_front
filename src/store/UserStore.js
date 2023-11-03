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
const ChangePassword = (userId, old_password, new_password,) => {
    return UserApi.ChangePassword(userId, old_password, new_password)
}
const GetAllUsers = () => {
    return UserApi.GetAllUsers()
        .then(res => allUsers.value = res)
}
const ChangeUsername = (newUsername, userId,isMe) => {
    return UserApi.ChangeUsername(newUsername, userId)
        .then(res => {
            if (isMe) AuthStore.username.value = res.username
        })
}
const ChangeEmail = (email, password, userId, isMe) => {

    return UserApi.ChangeEmail(email, password, userId)
        .then(res => {
            if (isMe) AuthStore.userEmail.value = res.email
        })
}
const DeleteUser = (id)=>{
    return UserApi.DeleteUser(id)
}
const UserStore = {
    DeleteUser,
    ChangeUsername,
    ChangeEmail,
    ChangePassword,
    ResetPasswordEmail,
    ResetPasswordEmailSendNewPassword,
    GetAllUsers,
    allUsers
}
export default UserStore;