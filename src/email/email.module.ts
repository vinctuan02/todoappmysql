import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
    imports: [
        ConfigModule, // Để lấy biến môi trường từ .env
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>('MAIL_HOST'), // smtp.gmail.com
                    port: configService.get<number>('MAIL_PORT'), // 587
                    secure: false, // false nếu dùng port 587, true nếu dùng 465
                    auth: {
                        user: configService.get<string>('MAIL_USER'), // Email gửi
                        pass: configService.get<string>('MAIL_PASS'), // App Password
                    },
                },
                defaults: {
                    from: '"NestJS Mailer" <no-reply@example.com>', // Email mặc định
                },
                template: {
                    dir: join(__dirname, '..', 'email', 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true, // Kiểm tra lỗi chặt chẽ
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [EmailController],
    providers: [EmailService],
    exports: [EmailService], // Export để dùng ở module khác
})
export class EmailModule { }
