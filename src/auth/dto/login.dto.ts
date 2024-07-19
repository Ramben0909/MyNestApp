import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString,Length } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @Length(2,20)
    @IsNotEmpty()
    @IsString()
    password: string;
}