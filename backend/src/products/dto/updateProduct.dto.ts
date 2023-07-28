import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsDecimal()
    price?: number

    @IsOptional()
    @IsNumber()
    rating?: number

    @IsOptional()
    @IsString()
    img?: string
}
