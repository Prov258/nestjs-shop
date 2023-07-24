import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsDecimal()
    price: number

    @IsNotEmpty()
    @IsString()
    img: string

    @IsNotEmpty()
    @IsNumber()
    brandId: number

    @IsNotEmpty()
    @IsNumber()
    typeId: number
}
