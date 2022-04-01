import Product from "../models/productModel";

class ProductService {

    async getProducts() {
        return await Product.find();
    }

    async findProduct(id) {
        return await Product.findById(id);
    }

    async getProductsForUser(id) {
        return await Product.find({ user_id: id });
    }

    async updateProduct(id, newProduct) {
        return await Product.findByIdAndUpdate(id, newProduct, { new: true });
    }

    async createProduct(newProduct) {
        return await Product.create(newProduct);
    }

    async deleteProduct(_id) {
        return await Product.deleteOne(_id);
    }

}

export default ProductService;