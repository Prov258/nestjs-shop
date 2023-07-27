import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'
import { RatingService } from './rating.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface'
import { RatingDto } from './dto/rating.dto'

@Controller('rating')
export class RatingController {
    constructor(private ratingService: RatingService) {}

    @Get('id')
    getRatingsForProduct(@Param('id') productId: string) {
        return this.ratingService.getRatingsForProduct(Number(productId))
    }

    @UseGuards(AuthGuard)
    @Post(':id')
    addRating(
        @Param('id') productId: string,
        @Req() req: AuthenticatedRequest,
        @Body() ratingDto: RatingDto,
    ) {
        return this.ratingService.addRating(
            Number(productId),
            req.user.sub,
            ratingDto,
        )
    }
}
