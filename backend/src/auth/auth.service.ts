import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { UsersService } from 'src/users/users.service'
import * as bcryptjs from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/users.model'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signup(authDto: AuthDto) {
        const hashPassword = await bcryptjs.hash(authDto.password, 12)
        const user = await this.userService.createUser({
            ...authDto,
            password: hashPassword,
        })

        return this.generateToken(user)
    }

    async login(authDto: AuthDto) {
        const user = await this.userService.getUserByEmail(authDto.email)
        if (!user) {
            throw new UnauthorizedException({ message: 'wrong email' })
        }

        const comparedPasswords = await bcryptjs.compare(
            authDto.password,
            user.password,
        )
        if (!comparedPasswords) {
            throw new UnauthorizedException({ message: 'wrong password' })
        }

        return this.generateToken(user)
    }

    async generateToken(user: User) {
        const payload = { sub: user.id, email: user.email, role: user.role }
        return { access_token: await this.jwtService.signAsync(payload) }
    }
}
