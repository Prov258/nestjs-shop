import { BadRequestException, Injectable } from '@nestjs/common'
import { RatingDto } from './dto/rating.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Rating } from './rating.model'
import { ProductsService } from 'src/products/products.service'
import { Sequelize } from 'sequelize'

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
        const product = await this.productsService.getProductById(productId)

        if (!product || ratingDto.rate > 5 || ratingDto.rate < 0) {
            throw new BadRequestException()
        }

        const createdRating = await this.ratingModel.create({
            userId,
            productId,
            ratingDto,
        })

        const average = (
            await this.ratingModel.findOne({
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('rate')), 'average'],
                ],
                where: { productId },
            })
        ).getDataValue('average')

        await product.update({ rating: average })

        return createdRating
    }
}
