import api from "@/api/api";

const GetOrders = () => {
    return api.get('/order/all').then(res => res.data)
}
const GetUserOrders = (user_id) => {
    return api.get('/order/user', {
        params: {
            user_id
        }
    }).then(res => res.data)
}
const GetOrder = (order_id) => {
    return api.get('/order', {
        params: {
            order_id
        }
    }).then(res => res.data)
}
const addOrder = (address_id, user_id, delivery, pay_type, products) => {
    return api.post('/order', {
        address_id, user_id, delivery, pay_type, products
    }).then(res => res.data)
}
const addOrderNotLogged = (delivery, pay_type, products, name, surname, address, zipcode, city, number) => {
    return api.post('/order/notLogged', {
        delivery, pay_type, products, name, surname, address, zipcode, city, number
    }).then(res => res.data)
}
const OrderApi = {
    addOrderNotLogged, addOrder, GetUserOrders, GetOrder, GetOrders
}
export default OrderApi