import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export const ordersValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const userValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string(),
  password: z.string(),
  age: z.number().positive(),
  email: z.string().email(),
  hobbies: z.array(z.string()),
  isActive: z.boolean(),
  fullName: fullNameValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
  address: addressValidationSchema,
});

export default userValidationSchema;
