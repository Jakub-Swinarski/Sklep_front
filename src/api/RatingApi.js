import api from "@/api/api";

const getUserRatings = (user_id) => {
    return api.get('/rating/user', {
        params: {
            user_id
        }
    }).then(r => r.data)
}
const editRatings = (rating_id, heading, description,rating) =>{
    return api.put('/rating/',{
        rating_id,
        heading,
        description,
        rating
    }).then(res => res.data)
}
const RatingApi = {
    editRatings,
    getUserRatings,
}
export default RatingApi