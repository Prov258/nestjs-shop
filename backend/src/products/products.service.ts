import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common'
import { ProductDto } from './dto/product.dto'
import { Product } from './products.model'
import { InjectModel } from '@nestjs/sequelize'
import { UpdateProductDto } from './dto/updateProduct.dto'
import { CartService } from 'src/cart/cart.service'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { FilterQueryDto } from './dto/filterQuery.dto'
import { SortingOptions } from './pipes/sortingQuery.pipe'

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product) private productModel: typeof Product,
        private cartService: CartService,
    ) {}

    async getProducts(
        filterOptions: FilterQueryDto,
        sortOptions: SortingOptions,
    ) {
        return await this.productModel.findAll({
            where: { ...filterOptions },
            order: sortOptions,
            include: [{ all: true }],
        })
    }

    async getProductById(id: number) {
        return await this.productModel.findOne({
            where: { id },
            include: [{ all: true }],
        })
    }

    async createProduct(productDto: ProductDto, image: Express.Multer.File) {
        if (!image) {
            throw new BadRequestException({
                message: 'error: image is missing',
            })
        }

        return await this.productModel.create({
            ...productDto,
            img: image.filename,
        })
    }

    async updateProductById(
        id: number,
        updateProductDto: UpdateProductDto,
        image?: Express.Multer.File,
    ) {
        const product = await this.getProductById(id)

        if (!product) {
            throw new BadRequestException()
        }

        const updateProductInfo: any = { ...updateProductDto }

        if (image) {
            await this.deleteImage(product.img)
            updateProductInfo.img = image.filename
        }

        return await this.productModel.update(updateProductInfo, {
            where: { id },
        })
    }

    async deleteProductById(id: number) {
        const product = await this.productModel.findOne({ where: { id } })

        await this.cartService.deleteProductFromAllCarts(id)
        await this.deleteImage(product.img)
        return await this.productModel.destroy({ where: { id } })
    }

    private async deleteImage(filename: string) {
        try {
            await unlink(
                join(__dirname, '..', '..', 'public', 'images', filename),
            )
        } catch {
            throw new InternalServerErrorException()
        }
    }
}
