import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator'

export class RatingDto {
    @IsNotEmpty()
    @IsInt()
    @Max(5)
    @Min(0)
    rate: number

    @IsOptional()
    @IsString()
    description?: string
}
