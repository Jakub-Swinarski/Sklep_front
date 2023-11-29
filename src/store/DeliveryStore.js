import DeliveryApi from "@/api/DeliveryApi";

const getUserDeliveryData = (userId) => {
    return DeliveryApi.getUserDeliveryData(userId)
}
const addAddress = (name, surname, address, city, zipcode, number, userId) => {
    return DeliveryApi.addAddress(name, surname, address, city, zipcode, number, userId)
}
const deleteAddress = (delivery_id) => {
    return DeliveryApi.deleteAddress(delivery_id)
}
const editAddress = (delivery_id, name, surname, address, city, zipcode, number) => {
    return DeliveryApi.editAddress(delivery_id, name, surname, address, city, zipcode, number)
}
const DeliveryStore = {
    addAddress, editAddress, deleteAddress, getUserDeliveryData
}
export default DeliveryStore