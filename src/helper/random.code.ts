export function generateVerificationCode(): string {
    const code = Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên từ 100000 đến 999999
    return code.toString();
}