import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Cart, CartProduct } from './cart.model'
import { UpdateCartDto } from './dto/updateCart.dto'

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

        return await this.cartProductModel.create({
            cartId: cart.id,
            productId,
        })
    }

    async updateCartProductQuantity(
        userId: number,
        { count, productId }: UpdateCartDto,
    ) {
        const cart = await this.cartModel.findOne({
            where: { userId },
        })
        const cartProduct = await this.cartProductModel.findOne({
            where: { cartId: cart.id, productId },
        })

        if (!cartProduct) {
            throw new NotFoundException()
        }

        const newQuantity = cartProduct.quantity + count

        if (newQuantity < 1) {
            return await this.deleteProductFromCart(userId, productId)
        }

        return await cartProduct.update({ quantity: newQuantity })
    }

    async deleteProductFromCart(userId: number, productId: number) {
        const cart = await this.cartModel.findOne({
            where: { userId },
        })
        return await this.cartProductModel.destroy({
            where: { cartId: cart.id, productId },
        })
    }

    async deleteProductFromAllCarts(productId: number) {
        return await this.cartProductModel.destroy({ where: { productId } })
    }
}
