import * as bcrypt from 'bcrypt'

export const hashPasswordFunc = async (password: string): Promise<string> => {
    const salt = 10
    return await bcrypt.hash(password, salt)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}