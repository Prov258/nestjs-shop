import { Body, Controller, Post } from '@nestjs/common'
import { BrandsService } from './brands.service'

@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) {}

    @Post()
    createBrand(@Body('name') name: string) {
        return this.brandsService.createBrand(name)
    }
}
