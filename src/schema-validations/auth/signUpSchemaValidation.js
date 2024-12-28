import { z as zod } from 'zod';

export const signUpSchemaValidation = zod.object({
  full_name: zod.string().min(1, { message: 'Full name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});
