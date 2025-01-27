import { z as zod } from 'zod';

export const createNewBahanSchemaValidation = zod.object({
  bahan: zod.string().min(1, { message: 'Bahan is required!' }),
});
