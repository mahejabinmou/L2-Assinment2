import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const userAddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: userNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
});

export default userValidationSchema;
