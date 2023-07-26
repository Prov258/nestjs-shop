import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductDto } from './dto/product.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { Role } from 'src/auth/role.enum'
import { RolesGuard } from 'src/auth/roles.guard'
import { UpdateProductDto } from './dto/updateProduct.dto'

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    getProducts() {
        return this.productsService.getProducts()
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(Number(id))
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Post()
    createProduct(@Body() productDto: ProductDto) {
        return this.productsService.createProduct(productDto)
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Put(':id')
    updateProductById(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.updateProductById(
            Number(id),
            updateProductDto,
        )
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteProductById(@Param('id') id: string) {
        return this.productsService.deleteProductById(Number(id))
    }
}
