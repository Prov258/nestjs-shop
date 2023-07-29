import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { BrandsService } from './brands.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { Role } from 'src/auth/role.enum'
import { Roles } from 'src/auth/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard'

@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) {}

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Post()
    createBrand(@Body('name') name: string) {
        return this.brandsService.createBrand(name)
    }
}
