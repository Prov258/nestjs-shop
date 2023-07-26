import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { User } from './users.model'
import { CartService } from 'src/cart/cart.service'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        private cartService: CartService,
    ) {}

    async createUser(authDto: AuthDto) {
        const user = await this.userModel.create(authDto)
        await this.cartService.createCart(user.id)

        return user
    }

    async getUserByEmail(email: string) {
        return await this.userModel.findOne({ where: { email } })
    }
}
