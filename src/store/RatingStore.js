import RatingApi from "@/api/RatingApi";

const getUserRatings = (userId) => {
    return RatingApi.getUserRatings(userId)
}
const editRatings = (ratingId, heading, description,rating) =>{
    return RatingApi.editRatings(ratingId, heading, description,rating)
}

const RatingStore = {
    editRatings,
    getUserRatings
}
export default RatingStore