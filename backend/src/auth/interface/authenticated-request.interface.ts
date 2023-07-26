export interface AuthenticatedRequest extends Request {
    user: { sub: number; email: string; role: string }
}
