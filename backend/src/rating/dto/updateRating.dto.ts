import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator'

export class UpdateRatingDto {
    @IsOptional()
    @IsInt()
    @Max(5)
    @Min(0)
    rate?: number

    @IsOptional()
    @IsString()
    description?: string
}
