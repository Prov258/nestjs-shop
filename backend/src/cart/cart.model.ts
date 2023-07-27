import { IsNotEmpty, IsNumber } from 'class-validator'
import {
    BelongsTo,
    Column,
    DataType,
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

    @IsNotEmpty()
    @IsNumber()
    @Column({ type: DataType.INTEGER, defaultValue: 1 })
    quantity: number
}
