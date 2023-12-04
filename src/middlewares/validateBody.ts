import { schemaUser } from '../schemas/userSchema'
import { fromZodError } from 'zod-validation-error'
import { Request, Response, NextFunction } from 'express'


export const validateBody = (req: Request, res: Response, next: NextFunction) => {
    const result = schemaUser.safeParse(req.body)
    if (!result.success) {
        return res.status(422).json({ message: fromZodError(result.error).message })
    }
    next()
}


