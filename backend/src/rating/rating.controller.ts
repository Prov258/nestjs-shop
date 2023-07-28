import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common'
import { RatingService } from './rating.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface'
import { RatingDto } from './dto/rating.dto'
import { UpdateRatingDto } from './dto/updateRating.dto'

@Controller('rating')
export class RatingController {
    constructor(private ratingService: RatingService) {}

    @Get(':id')
    getRatingsForProduct(@Param('id', ParseIntPipe) productId: number) {
        return this.ratingService.getRatingsForProduct(productId)
    }

    @UseGuards(AuthGuard)
    @Post(':id')
    addRating(
        @Param('id', ParseIntPipe) productId: number,
        @Req() req: AuthenticatedRequest,
        @Body() ratingDto: RatingDto,
    ) {
        return this.ratingService.addRating(productId, req.user.sub, ratingDto)
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    updateRating(
        @Param('id', ParseIntPipe) ratingId: number,
        @Req() req: AuthenticatedRequest,
        @Body() updateRatingDto: UpdateRatingDto,
    ) {
        return this.ratingService.updateRating(
            ratingId,
            req.user.sub,
            updateRatingDto,
        )
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteRatingById(
        @Param('id', ParseIntPipe) ratingId: number,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.ratingService.deleteRatingById(ratingId, req.user.sub)
    }
}
