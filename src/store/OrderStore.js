import OrderApi from "@/api/OrderApi";

const GetOrders = () => {
    return OrderApi.GetOrders()
}
const GetUserOrders = (userId) => {
    return OrderApi.GetUserOrders(userId)
}
const GetOrder = (id) => {
    return OrderApi.GetOrder(id)
}
const addOrder = (address_id, user_id, delivery, payType, products) => {
    return OrderApi.addOrder(address_id, user_id, delivery, payType, products)
}
const addOrderNotLogged = (delivery, pay_type, products, name, surname, address, zipcode, city, number) => {
    return OrderApi.addOrderNotLogged(delivery, pay_type, products, name, surname, address, zipcode, city, number)
}
const OrderStore = {
    addOrderNotLogged, addOrder, GetUserOrders, GetOrder, GetOrders
}
export default OrderStore