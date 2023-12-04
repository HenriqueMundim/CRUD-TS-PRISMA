import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient
export const updateUser = (req: Request, res: Response) => {
    const { id } = req.params
    const { name, email } = req.body

    const userExists = prisma.user.findFirst({
        where: {
            id: Number(id)
        }
    })

    if (!userExists) {
        return res.status(404).json({ message: 'User not found' })
    }

    const updatedUser = prisma.user.update({
        data: {
            name,
            email
        },
        where: {
            id: Number(id)
        }
    })
};      