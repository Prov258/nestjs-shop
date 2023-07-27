import { Module } from '@nestjs/common'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Product } from './products.model'
import { CartModule } from 'src/cart/cart.module'

@Module({
    imports: [SequelizeModule.forFeature([Product]), CartModule],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService],
})
export class ProductsModule {}
