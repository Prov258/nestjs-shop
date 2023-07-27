import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class RatingDto {
    @IsNotEmpty()
    @IsNumber()
    rate: number

    @IsOptional()
    @IsString()
    description?: string
}
