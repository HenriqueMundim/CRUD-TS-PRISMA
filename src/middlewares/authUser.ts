import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import prisma from '../providers/prismaProvider';

interface JwtPayload {
    id: string
};

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const token = authorization.split(' ')[1];
    const { id } = verify(token, process.env.JWTPASS!) as JwtPayload;

    if (!id) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    const userActive = prisma.user.findFirst({
        where: {
            id: Number(id)
        }
    });
    
    next();
}