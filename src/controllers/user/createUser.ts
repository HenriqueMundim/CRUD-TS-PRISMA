import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hash } from 'bcrypt'

const prisma: PrismaClient = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await prisma.user.findFirst({
            where: {
                email
            }
        });
        if (userExists) {
            return res.status(400).json({ 'message': 'User already exists' });
        }
        const encryptedPass = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: encryptedPass
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        });
        return res.status(201).json({ 'message': 'User created sucessful', newUser });
    } catch (error: any) {
        return res.status(error.statusCode).json({ 'message': `${error.message}` });
    }
};