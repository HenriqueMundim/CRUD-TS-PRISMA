import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listUser = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        });
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(error.code).json({ 'message': error.message });
    }
}  