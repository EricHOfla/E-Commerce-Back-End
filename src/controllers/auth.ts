import { compareSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { prismaClient } from '..';
import { JWT_SECRET } from '../screates';


export const signup = async (req: Request, res: Response) => {
    const { email, password, name} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})
    if (user){
        throw Error('User already Exists!')
    }

    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password:hashSync(password, 10)
        }
    })
    res.json(user)
}

export const login = async (req: Request, res: Response) => {
    const { email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})
    if (!user){
        throw Error("User doesn't Exists!")
    }
    if (!compareSync(password, user.password)) {
       throw Error('Incorrect Password') 
    }
    const token = jwt.sign({
        userId: user.id
    },JWT_SECRET)


    res.json({user, token})
}