import { Injectable } from '@nestjs/common'
import { ProductDto } from './dto/product.dto'
import { Product } from './products.model'
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product) private productModel: typeof Product) {}

    async getProducts() {
        return this.productModel.findAll()
    }

    async createProduct(productDto: ProductDto) {
        return this.productModel.create(productDto)
    }
}
