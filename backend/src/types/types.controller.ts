import { Body, Controller, Post } from '@nestjs/common'
import { TypesService } from './types.service'

@Controller('types')
export class TypesController {
    constructor(private typesService: TypesService) {}

    @Post()
    createType(@Body('name') name: string) {
        return this.typesService.createType(name)
    }
}
