import { Module } from '@nestjs/common'
import { TypesController } from './types.controller'
import { TypesService } from './types.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Type } from './types.model'

@Module({
    imports: [SequelizeModule.forFeature([Type])],
    controllers: [TypesController],
    providers: [TypesService],
})
export class TypesModule {}
