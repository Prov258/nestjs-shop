import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { ConfigModule } from '@nestjs/config'
import { User } from './users/users.model'
import { AuthModule } from './auth/auth.module'
import { ProductsController } from './products/products.controller'
import { ProductsService } from './products/products.service'
import { ProductsModule } from './products/products.module'
import { Product } from './products/products.model'
import { BrandsModule } from './brands/brands.module'
import { TypesModule } from './types/types.module'
import { Brand } from './brands/brands.model'
import { Type } from './types/types.model'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            autoLoadModels: true,
            synchronize: true,
            models: [User, Product, Brand, Type],
        }),
        UsersModule,
        AuthModule,
        ProductsModule,
        BrandsModule,
        TypesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
