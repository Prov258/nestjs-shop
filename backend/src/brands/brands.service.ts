import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Brand } from './brands.model'

@Injectable()
export class BrandsService {
    constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

    async createBrand(name: string) {
        return await this.brandModel.create({ name })
    }
}
