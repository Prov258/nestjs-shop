import { Module } from '@nestjs/common'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { Cart, CartProduct } from './cart.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
    imports: [SequelizeModule.forFeature([Cart, CartProduct])],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService],
})
export class CartModule {}
