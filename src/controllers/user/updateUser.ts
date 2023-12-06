import { hash } from "bcrypt";
import { Request, Response } from "express";
import prisma from "../../providers/prismaProvider";

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findFirst({
        where: {
            id: Number(id)
        }
    });

    if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
    }

    const encryptedPass = await hash(password, 10)

    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name: name,
            email: email,
            password: encryptedPass
        }
    });

    return res.status(204).json()
};      