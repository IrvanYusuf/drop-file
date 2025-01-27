import { z as zod } from 'zod';

export const createNewProductSchemaValidation = zod.object({
  product_name: zod.string().min(1, { message: 'Product name is required!' }),
  bahan_id: zod.string().min(1, { message: 'Bahan is required!' }),
  product_price: zod.number().min(1, { message: 'Product price is required' }),
});
