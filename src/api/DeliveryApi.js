import api from "@/api/api";

const getUserDeliveryData = (user_id) => {
    return api.get('/address/', {
        params: {
            user_id
        }
    }).then(res => res.data)
}
const addAddress = (name, surname, address, city, zipcode, number,user_id) => {
    return api.post('/address/', {
        name, surname, address, city, zipcode, number, user_id
    }).then(res => res.data)
}
const deleteAddress = (delivery_id) => {
    return api.delete('/address/', {
        params: {
            delivery_id
        }
    }).then(res => res.data)
}
const editAddress = (address_id, name, surname, address, city, zipcode, number) => {
    return api.put('/address/', {
        address_id, name, surname, address, city, zipcode, number
    }).then(res => res.data)
}

const DeliveryApi = {
    addAddress, editAddress, deleteAddress, getUserDeliveryData
}
export default DeliveryApi