import api from "@/api/api";

const addLike = (user_id, product_id) => {
    return api.post('/like/', {
        user_id, product_id
    }).then((res => res.data))
}
const deleteLike = (like_id) => {
    return api.delete('/like/', {
        params: {
            like_id
        }
    }).then((res => res.data))
}
const getUserLikes = (user_id) => {
    return api.get('/like/user', {
        params: {
            user_id
        }
    }).then((res => res.data))
}
const getProductLikes = (product_id) => {
    return api.get('/like/product',{
        params:{
            product_id
        }
    }).then((res => res.data))
}
const LikeApi = {
    deleteLike,
    getProductLikes,
    getUserLikes,
    addLike
}
export default LikeApi