import { Table, Model, Column, DataType, HasOne } from 'sequelize-typescript'
import { Cart } from 'src/cart/cart.model'

interface UserCreationInterface {
    email: string
    password: string
}

@Table
export class User extends Model<User, UserCreationInterface> {
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @Column({ type: DataType.STRING, defaultValue: 'USER' })
    role: string

    @HasOne(() => Cart)
    cart: Cart
}
