import { z } from 'zod'

export const schemaUser = z.object({
    name: z.string({ required_error: 'Name must to be a string' }).regex(/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u, "Invalid name"),
    email: z.string({ description: 'Name email to be a string' }).email({ message: 'Invalid email' }),
    password: z.string().min(5, 'Password must have a least 5 characteres')
})