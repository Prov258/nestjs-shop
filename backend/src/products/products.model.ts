import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript'
import { Brand } from 'src/brands/brands.model'
import { Type } from 'src/types/types.model'

interface ProductCreationInterface {
    name: string
    price: number
    img: string
    brandId: number
    typeId: number
}

@Table
export class Product extends Model<Product, ProductCreationInterface> {
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    price: number

    @Column({
        type: DataType.DECIMAL(10, 1),
        defaultValue: 0,
        allowNull: false,
    })
    rating: number

    @Column({ type: DataType.STRING, allowNull: false })
    img: string

    @ForeignKey(() => Brand)
    @Column
    brandId: number

    @BelongsTo(() => Brand)
    brand: Brand

    @ForeignKey(() => Type)
    @Column
    typeId: number

    @BelongsTo(() => Type)
    type: Type
}
