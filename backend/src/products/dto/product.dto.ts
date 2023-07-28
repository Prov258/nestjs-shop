import { Transform } from 'class-transformer'
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsDecimal()
    price: number

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    brandId: number

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    typeId: number
}
