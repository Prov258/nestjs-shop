import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductDto } from './dto/product.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { Role } from 'src/auth/role.enum'
import { RolesGuard } from 'src/auth/roles.guard'

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    getProducts() {
        return this.productsService.getProducts()
    }

    @Get(':id')
    getProductById() {}

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Post()
    createProduct(@Body() productDto: ProductDto) {
        return this.productsService.createProduct(productDto)
    }

    @Put(':id')
    updateProductById() {}
}
