import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string({ description: 'Email must to be a string' }).email('Invalid email'),
    password: z.string({ description: 'Email must to be a string' }).min(5, 'Password must have a least 5 characteres')
});