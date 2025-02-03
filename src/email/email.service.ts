import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendTestEmail(to: string) {
        try {
            await this.mailerService.sendMail({
                to,
                subject: 'Test Email with Handlebars',
                template: 'test-email', // Tên file HBS, không cần .hbs
                context: { // Dữ liệu truyền vào HBS
                    name: "tuan",
                    message: "test",
                    date: new Date().toLocaleString(),
                },
            });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    async sendVerificationEmail(to: string, codeId: string, codeExpired: Date, CODE_EXPIRED: string) {
        try {
            await this.mailerService.sendMail({
                to,
                subject: 'Account registration verification email',
                template: 'account-registration-verification', // Tên file HBS, không cần .hbs
                context: { // Dữ liệu truyền vào HBS
                    name: to,
                    verificationCode: codeId,
                    verificationLink: '',
                    codeExpired: codeExpired,
                    CODE_EXPIRED: CODE_EXPIRED
                },
            });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
}
