import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'
import { Op } from 'sequelize'

export class FilterQueryDto {
    @IsOptional()
    @Transform(({ value }) => Number(value))
    brandId?: number

    @IsOptional()
    @Transform(({ value }) => Number(value))
    typeId?: number

    @IsOptional()
    @Transform(({ value }) => ({
        [Op.between]: value.split(',').map((el: string) => Number(el)),
    }))
    price?: { [Op.between]: [number, number] }
}
