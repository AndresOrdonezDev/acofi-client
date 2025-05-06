import {z} from 'zod'

//** consecutive */


//** Auth */

const authSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token:z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth,'email'| 'password'>

export const userSchema = authSchema.pick({
    username:true,
    email:true
}).extend({
    id:z.number()
})

export type User = z.infer<typeof userSchema>