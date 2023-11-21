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
const OrderStore = {
    GetUserOrders, GetOrder, GetOrders
}
export default OrderStore