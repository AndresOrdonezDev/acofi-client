import {z} from 'zod'

//** consecutive */
const  consecutiveSchema = z.object({
    acronym: z.string(),
    addressee: z.string(),
    topic: z.string(),
    requestedBy: z.string(),
})

type Consecutive = z.infer<typeof consecutiveSchema>
export type RequestConsecutiveForm = Pick<Consecutive,'acronym'|'addressee'|'requestedBy'|'topic'>

export const userConsecutiveSchema = z.object({
    id: z.number(),
    consecutive: z.string(),
    addressee: z.string(),
    topic: z.string(),
    requestedBy: z.string(),
    userId: z.number(),
    createdAt: z.string(),  // si quieres puedes usar .datetime() en vez de string (te explico más abajo)
    updatedAt: z.string(),
  
    user: z.object({
      id: z.number(),
      username: z.string(),
      email: z.string().email()
    })
  });

export type userConsecutive = z.infer<typeof userConsecutiveSchema>
export const userConsecutiveArraySchema = z.array(userConsecutiveSchema);

//** Auth */
const authSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    isAdmin:z.boolean(),
    password_confirmation: z.string(),
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth,'email'| 'password'>
export type CreateAccount = Pick<Auth,'email'|'password'|'username'|'isAdmin'|'password_confirmation'>

export const userSchema = authSchema.pick({
    username:true,
    email:true,
    isAdmin:true
}).extend({
    id:z.number()
})

export type User = z.infer<typeof userSchema>