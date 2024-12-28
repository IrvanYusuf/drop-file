import { z as zod } from 'zod';

export const ResetPasswordSchemaValidation = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});
