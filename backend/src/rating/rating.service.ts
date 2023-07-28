import { BadRequestException, Injectable } from '@nestjs/common'
import { RatingDto } from './dto/rating.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Rating } from './rating.model'
import { ProductsService } from 'src/products/products.service'
import { Sequelize } from 'sequelize'
import { UpdateRatingDto } from './dto/updateRating.dto'

@Injectable()
export class RatingService {
    constructor(
        @InjectModel(Rating) private ratingModel: typeof Rating,
        private productsService: ProductsService,
    ) {}

    async getRatingsForProduct(productId: number) {
        return this.ratingModel.findAll({ where: { productId } })
    }

    async addRating(productId: number, userId: number, ratingDto: RatingDto) {
        let createdRating = await this.ratingModel.findOne({
            where: { productId, userId },
        })

        if (createdRating) {
            throw new BadRequestException()
        }

        createdRating = await this.ratingModel.create({
            userId,
            productId,
            ...ratingDto,
        })

        await this.updateProductAverage(productId)

        return createdRating
    }

    async updateRating(
        ratingId: number,
        userId: number,
        updateRatingDto: UpdateRatingDto,
    ) {
        const rating = await this.ratingModel.findOne({
            where: { id: ratingId, userId },
        })

        if (!rating) {
            throw new BadRequestException()
        }

        const updatedRating = await rating.update(updateRatingDto)

        await this.updateProductAverage(rating.productId)

        return updatedRating
    }

    async deleteRatingById(ratingId: number, userId: number) {
        const rating = await this.ratingModel.findOne({
            where: { id: ratingId, userId },
        })

        if (!rating) {
            throw new BadRequestException()
        }

        const productId = rating.productId

        await rating.destroy()
        await this.updateProductAverage(productId)
    }

    private async updateProductAverage(productId: number) {
        const average = (
            await this.ratingModel.findOne({
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('rate')), 'average'],
                ],
                where: { productId },
            })
        ).getDataValue('average')

        await this.productsService.updateProductById(productId, {
            rating: average,
        })
    }
}
