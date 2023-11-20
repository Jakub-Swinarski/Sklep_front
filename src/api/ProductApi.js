import api from "@/api/api";

const GetAllProducts = () => {
    return api.get('/product/all').then(res => res.data)
}
const GetProduct = (product_id) => {
    return api.get('/product/', {
        params: {product_id}
    }).then(res => res.data)
}
const AddProduct = (name, price, supply, description) => {
    return api.post('/product/', {
        name,
        price,
        supply,
        description
    }).then(res => res.data)
}
const AddImage = (image, product_id) => {
    let formData = new FormData
    formData.append('image', image)
    formData.append('product_id', product_id)
    formData.append('_method', 'PUT');
    return api.post('/product/image', formData).then(res => res.data)
}
const DeleteImage = (product_id) => {
    return api.delete('/product/image/delete', {
        data: {
            product_id
        }
    }).then(res => res.data)
}
const ChangeName = (name, product_id) => {
    return api.put('/product/name', {
        name, product_id
    }).then(res => res.data)
}
const ChangePrice = (price, product_id) => {
    return api.put('/product/price', {
        price, product_id
    }).then(res => res.data)
}
const DeleteCategory = (category_id, product_id) => {
    return api.delete('/category', {
        data: {
            category_id, product_id
        }
    }).then(res => res.data)
}
const AddCategory = (name, product_id) => {
    return api.put('/category', {
        name, product_id
    }).then(res => res.data)
}
const ChangeDescription = (description, product_id) => {
    return api.put('/product/description', {
        description, product_id
    }).then(res => res.data)
}
const ChangeSupply = (supply, product_id) => {
    return api.put('/product/supply', {
        supply, product_id
    }).then(res => res.data)
}

const ProductApi = {
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
    GetProduct,
}
export default ProductApi