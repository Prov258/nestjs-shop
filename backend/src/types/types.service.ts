import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Type } from './types.model'

@Injectable()
export class TypesService {
    constructor(@InjectModel(Type) private typeModel: typeof Type) {}

    async createType(name: string) {
        return this.typeModel.create({ name })
    }
}
