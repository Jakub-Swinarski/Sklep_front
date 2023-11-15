import api from "@/api/api";

const GetOrders = () => {
    return api.get('/order/all').then(res => res.data)
}
const GetOrder = (order_id) => {
    return api.get('/order', {
        params: {
            order_id
        }
    }).then(res => res.data)
}
const OrderApi = {
    GetOrder, GetOrders
}
export default OrderApi