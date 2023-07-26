import {
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table,
} from 'sequelize-typescript'
import { Product } from 'src/products/products.model'
import { User } from 'src/users/users.model'

@Table
export class Cart extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number

    @HasMany(() => CartProduct)
    products: CartProduct[]
}

@Table
export class CartProduct extends Model {
    @ForeignKey(() => Cart)
    @Column
    cartId: number

    @BelongsTo(() => Cart)
    cart: Cart

    @ForeignKey(() => Product)
    @Column
    productId: number

    @BelongsTo(() => Product)
    product: Product
}
