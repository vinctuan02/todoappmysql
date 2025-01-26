import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPasswordFunc } from 'src/helper/password.helper';
import { plainToInstance } from 'class-transformer';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, email, phone_number } = createUserDto

    const userByEmail = await this.userRepository.findOne({ where: { email } })
    const userByPhoneNumber = await this.userRepository.findOne({ where: { phone_number } })

    if (userByEmail) {
      throw new BadRequestException("Email is exist")
    }

    if (userByPhoneNumber) {
      throw new BadRequestException("Phone number is exist")
    }

    const hashPassword: string = await hashPasswordFunc(password)

    const user = this.userRepository.create({ ...createUserDto, password: hashPassword })

    const savedUser = await this.userRepository.save(user)
    return plainToInstance(User, savedUser)
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.userRepository.find()
    return plainToInstance(User, allUsers)
  }

  async findOne(id: number): Promise<User> {
    const userById = await this.userRepository.findOne({ where: { id } })
    return plainToInstance(User, userById)
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const userById = await this.userRepository.findOne({ where: { id } })

    if (!userById)
      throw new NotFoundException(`User with ID: ${id} not found`)

    if (updateUserDto.password) {
      const hashPassword = await hashPasswordFunc(updateUserDto.password)
      updateUserDto.password = hashPassword
    }

    Object.assign(userById, updateUserDto)

    const updatedUser = await this.userRepository.save(userById)
    return plainToInstance(User, updatedUser)
  }

  async remove(id: number): Promise<string> {
    const userById = await this.userRepository.findOne({ where: { id } })

    if (!userById)
      throw new NotFoundException(`User with ID: ${id} not found`)
    await this.userRepository.delete(id)

    return (`User ${id} has been deleted successfully`)
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } })
  }


  async handleRegister(registerDto: CreateAuthDto): Promise<any> {

    const { email, password } = registerDto

    const userByEmail = await this.userRepository.findOne({ where: { email } })

    if (userByEmail) {
      throw new BadRequestException("Email is exist")
    }

    const hashPassword: string = await hashPasswordFunc(password)

    const user = {
      ...registerDto,
      password: hashPassword,
      isActive: "false",
      codeId: uuidv4(),
      codeExpired: dayjs().add(1, 'minutes').toDate(),
    }

    const savedUser = await this.userRepository.save(user)
    return plainToInstance(User, savedUser)

  }

}
