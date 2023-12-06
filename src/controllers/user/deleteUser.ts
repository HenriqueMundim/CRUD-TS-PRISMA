import { Request, Response } from "express";
import prisma from "../../providers/prismaProvider";

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const isExists = await prisma.user.findFirst({
        where: {
            id: Number(id)
        }
    })
    if (!isExists) {
        return res.status(404).json({ message: 'User not found' })
    }
    const deletedUser = await prisma.user.delete({
        select: {
            id: true,
            name: true,
            email: true
        },
        where: {
            id: Number(id)
        }
    })
    return res.status(200).json({ message: 'User deleted sucessful ', deletedUser: deletedUser })
}