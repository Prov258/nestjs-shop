import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common'
import { CartService } from './cart.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface'

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Get()
    getCart(@Req() req: AuthenticatedRequest) {
        return this.cartService.getCart(req.user.sub)
    }

    @Post()
    addProductToCart(
        @Req() req: AuthenticatedRequest,
        @Body('productId') productId: number,
    ) {
        return this.cartService.addProductToCart(req.user.sub, productId)
    }

    @Delete(':id')
    deleteProductFromCart(
        @Req() req: AuthenticatedRequest,
        @Param('id') id: string,
    ) {
        return this.cartService.deleteProductFromCart(req.user.sub, Number(id))
    }
}
