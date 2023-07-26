import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './users.model'
import { CartModule } from 'src/cart/cart.module'

@Module({
    imports: [SequelizeModule.forFeature([User]), CartModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
