import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { TypesService } from './types.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { Role } from 'src/auth/role.enum'
import { Roles } from 'src/auth/roles.decorator'
import { RolesGuard } from 'src/auth/roles.guard'

@Controller('types')
export class TypesController {
    constructor(private typesService: TypesService) {}

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard)
    @Post()
    createType(@Body('name') name: string) {
        return this.typesService.createType(name)
    }
}
