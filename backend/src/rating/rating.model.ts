import {
    Table,
    Column,
    DataType,
    ForeignKey,
    Model,
} from 'sequelize-typescript'
import { Product } from 'src/products/products.model'
import { User } from 'src/users/users.model'

@Table
export class Rating extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number

    @ForeignKey(() => Product)
    @Column
    productId: number

    @Column({ type: DataType.DECIMAL(1), allowNull: false })
    rate: number

    @Column({ type: DataType.STRING })
    description: string
}
