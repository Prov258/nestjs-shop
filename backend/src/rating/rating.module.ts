import { Module } from '@nestjs/common'
import { RatingController } from './rating.controller'
import { RatingService } from './rating.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Rating } from './rating.model'
import { ProductsModule } from 'src/products/products.module'

@Module({
    imports: [SequelizeModule.forFeature([Rating]), ProductsModule],
    controllers: [RatingController],
    providers: [RatingService],
})
export class RatingModule {}
