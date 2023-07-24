import { Table, Model, Column, DataType } from 'sequelize-typescript'

@Table
export class Brand extends Model {
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string
}
