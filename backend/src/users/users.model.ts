import { Table, Model, Column, DataType } from 'sequelize-typescript'

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
}
