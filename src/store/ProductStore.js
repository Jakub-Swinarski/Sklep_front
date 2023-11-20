import ProductApi from "@/api/ProductApi";
import {ref} from "vue";

const ProductId = ref()
const GetAllProducts = () => {
    return ProductApi.GetAllProducts()
}
const GetProduct = (id) => {
    return ProductApi.GetProduct(id)
}
const AddProduct = (name, price, supply, description) => {
    return ProductApi.AddProduct(name, price, supply, description).then((res)=>{
        ProductId.value = res.id
    })
}
const AddImage = (image, productId) => {
    return ProductApi.AddImage(image, productId)
}
const DeleteImage = (id) => {
    return ProductApi.DeleteImage(id)
}
const ChangeName = (name, id) => {
    return ProductApi.ChangeName(name, id)
}
const ChangePrice = (price, id) => {
    return ProductApi.ChangePrice(price, id)
}
const DeleteCategory = (catId, id) => {
    return ProductApi.DeleteCategory(catId, id)
}
const AddCategory = (name, id) => {
    return ProductApi.AddCategory(name, id)
}
const ChangeDescription = (desc, id) => {
    return ProductApi.ChangeDescription(desc, id)
}
const ChangeSupply = (supply, id) => {
    return ProductApi.ChangeSupply(supply, id)
}
const ProductStore = {
    AddProduct,
    ChangeSupply,
    ChangeName,
    ChangePrice,
    DeleteCategory,
    AddCategory,
    ChangeDescription,
    DeleteImage,
    AddImage,
    GetAllProducts,
    ProductId,
    GetProduct,
}
export default ProductStore