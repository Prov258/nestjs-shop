import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductDto } from './dto/product.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { Role } from 'src/auth/role.enum'
import { RolesGuard } from 'src/auth/roles.guard'
import { UpdateProductDto } from './dto/updateProduct.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from 'src/config/multer.config'

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    getProducts() {
        return this.productsService.getProducts()
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getProductById(id)
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image', multerOptions))
    @Post()
    createProduct(
        @UploadedFile() image: Express.Multer.File,
        @Body() productDto: ProductDto,
    ) {
        return this.productsService.createProduct(productDto, image)
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Put(':id')
    updateProductById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.updateProductById(id, updateProductDto)
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.deleteProductById(id)
    }
}
