import OrderApi from "@/api/OrderApi";

const GetOrders = () => {
    return OrderApi.GetOrders()
}
const GetOrder = (id) => {
    return OrderApi.GetOrder(id)
}
const OrderStore = {
    GetOrder, GetOrders
}
export default OrderStore