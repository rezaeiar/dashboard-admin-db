import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { Role } from 'src/user/enum/role.enum';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt.payload';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService ,
        private readonly jwtService:JwtService , 
    ){}

    private async _signToken(payload:JwtPayload){
        return await this.jwtService.signAsync(payload);
    }


    async verify(){

    }

    async signUp(signUpDto:SignUpDto){
        const {
            first_name , 
            last_name , 
            username , 
            password , 
            email
        } = signUpDto ;
        
        const savedUser = await this.userService.signUp({
            first_name , 
            last_name , 
            username , 
            password , 
            email
        });

        const payload:JwtPayload = {
            role : savedUser.roles , 
            sub : savedUser.id , 
            username : savedUser.username , 
        }

        const token = await this._signToken(payload);
        
        return {
            token , 
            roles : savedUser.roles ,
            email : savedUser.email , 
            first_name : savedUser.first_name ,
            last_name : savedUser.last_name ,
        } ; 

    }

    async signIn(signInDto:SignInDto){
        const {usernameOrEmail , password} = signInDto ;
        
        const user = await this.userService.findByUsernameOrEmail(usernameOrEmail);
        const validPass = await bcrypt.compare(password , user.password);

        if(!validPass){
            throw new BadRequestException('username or password is invalid')
        }

        const payload:JwtPayload = {
            sub : user.id , 
            role : user.roles , 
            username : user.username , 
        }

        const token = await this._signToken(payload);


        return {
            token , 
            roles : user.roles ,
            first_name : user.first_name , 
            last_name : user.last_name , 
            email : user.email 
        } ; 
    }


    async findUserByPayload({sub:id}:JwtPayload):Promise<User>{
        const user = await this.userService.findOne({id})


        if(!user){
            throw new UnauthorizedException()
        }


        return user ; 
    }
}
