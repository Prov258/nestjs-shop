import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductDto } from './dto/product.dto'
import { Product } from './products.model'
import { InjectModel } from '@nestjs/sequelize'
import { UpdateProductDto } from './dto/updateProduct.dto'
import { CartService } from 'src/cart/cart.service'

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productModel: typeof Product,
        private cartService: CartService,
    ) {}

    async getProducts() {
        return await this.productModel.findAll({ include: [{ all: true }] })
    }

    async getProductById(id: number) {
        return await this.productModel.findOne({
            where: { id },
            include: [{ all: true }],
        })
    }

    async createProduct(productDto: ProductDto) {
        return await this.productModel.create(productDto)
    }

    async updateProductById(id: number, updateProductDto: UpdateProductDto) {
        const product = await this.getProductById(id)

        if (!product) {
            throw new BadRequestException()
        }

        return await this.productModel.update(updateProductDto, {
            where: { id },
        })
    }

    async deleteProductById(id: number) {
        await this.cartService.deleteProductFromAllCarts(id)
        return await this.productModel.destroy({ where: { id } })
    }
}
