import * as z from 'zod';

export const SignupFormSchema = z
  .object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { error: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
      .regex(/[0-9]/, { error: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        error: 'Contain at least one special character.',
      })
      .trim(),
    name: z.string().min(1, { error: 'Name is required.' }).trim(),
    confirmPassword: z
      .string()
      .min(1, { error: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignupFormState =
  | {
      email?: string;
      name?: string;
      password?: string;
      confirmPassword?: string;
      errors?: {
        email?: string[];
        password?: string[];
        city?: string[];
      };
      message?: string;
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.email({ error: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { error: 'Password is required.' }).trim(),
});

export type LoginFormState =
  | {
      email?: string;
      password?: string;
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type OfferFormState =
  | {
      plantId?: string;
      description?: string;
      errors?: {
        plantId?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;

export const OfferFormSchema = z.object({
  plantId: z.string().min(1, { error: 'Please select a plant.' }).trim(),
  description: z.string().trim().optional(),
});

export interface Timestamps {
  created_at: string;
  updated_at: string;
}

export interface Plant extends Timestamps {
  id: string;
  name: string;
  slug: string;
  photo_url?: string;
}

export interface Offer extends Timestamps {
  id: string;
  profile_id: string;
  plant_id: string;
  description?: string;
  profiles?: {
    username: string;
  };
  plants?: {
    name: string;
  };
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
}
