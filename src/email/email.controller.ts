import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { Public } from 'src/auth/customize';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Public()
    @Get('send-test')
    async sendTestEmail() {
        return this.emailService.sendTestEmail('vinctuan02@gmail.com');
    }
}
