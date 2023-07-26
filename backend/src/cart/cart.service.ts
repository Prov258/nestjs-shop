import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Cart, CartProduct } from './cart.model'

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart) private cartModel: typeof Cart,
        @InjectModel(CartProduct) private cartProductModel: typeof CartProduct,
    ) {}

    async createCart(userId: number) {
        return await this.cartModel.create({ userId })
    }

    async getCart(userId: number) {
        const cart = await this.cartModel.findOne({
            where: { userId },
            include: [{ all: true, nested: true }],
        })

        return cart
    }

    async addProductToCart(userId: number, productId: number) {
        const cart = await this.cartModel.findOne({
            where: { userId },
        })
        const cartProduct = await this.cartProductModel.create({
            cartId: cart.id,
            productId,
        })

        return cartProduct
    }

    async deleteProductFromCart(userId: number, productId: number) {
        const cart = await this.cartModel.findOne({
            where: { userId },
        })
        return await this.cartProductModel.destroy({
            where: { cartId: cart.id, productId },
        })
    }
}
