import { schemaUser } from '../schemas/userSchema'
import { loginSchema } from '../schemas/loginSchema'
import { fromZodError } from 'zod-validation-error'
import { Request, Response, NextFunction } from 'express'


export const validateBody = (req: Request, res: Response, next: NextFunction) => {
    const result = schemaUser.safeParse(req.body)
    if (!result.success) {
        return res.status(422).json({ message: fromZodError(result.error).message })
    }
    next()
}

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const result = loginSchema.safeParse(req.body)
    if (!result.success) {
        return res.status(422).json({ message: fromZodError(result.error).message })
    }
    next()
}


