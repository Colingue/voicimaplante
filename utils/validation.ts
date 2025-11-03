import { z } from 'zod';

export const registrationSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  city: z.string().nonempty('City is required'),
});
