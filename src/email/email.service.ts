import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP server của bạn, ví dụ Gmail
      port: 587,
      secure: false, // true nếu bạn dùng port 465, false nếu 587
      auth: {
        user: 'vinctuandev02@gmail.com', // Email của bạn
        pass: 'zbmqlucjpmbpobys', // Mật khẩu ứng dụng (App Password) hoặc mật khẩu email
      },
    });
  }

  // async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
  async sendMail(): Promise<void> {
    const mailOptions = {
      from: '"Vinc02" vinctuandev02@gmail.com', // Tên người gửi
      to: 'vinctuan02@gmail.com',
      subject: 'Test', // Chủ đề email
      text: 'test', // Nội dung dạng text
      html: 'test', // Nội dung dạng HTML (tùy chọn)
    };

    await this.transporter.sendMail(mailOptions);
  }
}
