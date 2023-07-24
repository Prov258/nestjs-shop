import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async createUser(authDto: AuthDto) {
        return await this.userModel.create(authDto)
    }

    async getUserByEmail(email: string) {
        return await this.userModel.findOne({ where: { email } })
    }
}
