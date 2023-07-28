import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common'
import { CartService } from './cart.service'
import { AuthGuard } from 'src/auth/auth.guard'
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface'
import { UpdateCartDto } from './dto/updateCart.dto'

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

    @Put()
    updateProductCartQuantity(
        @Req() req: AuthenticatedRequest,
        @Body() updateCartDto: UpdateCartDto,
    ) {
        return this.cartService.updateCartProductQuantity(
            req.user.sub,
            updateCartDto,
        )
    }

    @Delete(':id')
    deleteProductFromCart(
        @Req() req: AuthenticatedRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.cartService.deleteProductFromCart(req.user.sub, id)
    }
}
