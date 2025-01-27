import { z as zod } from 'zod';

export const otpVerifySchemaValidation = zod.object({
  otp: zod.string().min(1, { message: 'OTP is required' }).max(6, { message: 'max otp is 6' }),
});
