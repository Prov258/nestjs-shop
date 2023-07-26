import { IsDecimal, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsDecimal()
    price?: number

    @IsOptional()
    @IsString()
    img?: string
}
