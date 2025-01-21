import { AuthGuard } from "@nestjs/passport";

export class LocalAuthGruad extends AuthGuard('local'){}