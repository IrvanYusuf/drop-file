import { z as zod } from 'zod';

export const otpVerifySchemaValidation = zod
  .object({
    otp: zod.string().min(1, { message: 'OTP is required' }).max(6, { message: 'max otp is 6' }),
    password: zod.string().min(1, { message: 'New password is required' }),
    confirmPassword: zod.string().min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
