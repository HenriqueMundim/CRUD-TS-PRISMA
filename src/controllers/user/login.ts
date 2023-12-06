import { Request, Response } from "express";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import dotenv from 'dotenv';
import prisma from "../../providers/prismaProvider";

dotenv.config()


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExists = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await compare(password, userExists.password);

    if (!validPassword) {
        return res.status(422).json({ message: 'Password is incorrect' });
    }

    const token = await sign({ id: userExists.id }, process.env.JWTPASS!, { expiresIn: '8h' });
    const { password: _, ...loggedUser } = userExists;

    return res.status(200).json({ user: loggedUser, token });

}