import { z } from 'zod';

export const createProjectSchemaValidation = z.object({
  title: z.string().min(1, { message: 'Title project is required!' }),
  description: z.string().min(1, { message: 'Description project is required!' }),
});

export const productStepperSchemaValidation = z
  .object({
    // title: z.string().optional(),
    // description: z.string().optional(),
    patients: z.object({
      patientName: z.string().optional(),
      patientPhone: z.string().optional(),
    }),
    position: z.array(z.number()).min(1, { message: 'At least one position is required' }),
    color: z.string().min(1, { message: 'Color is required' }),
    product: z.string().min(1, { message: 'Product name is required' }),
    products: z
      .array(
        z.object({
          productId: z.string(),
          productName: z.string(),
          color: z.string(),
          price: z.number(),
          positions: z.array(z.number()),
        })
      )
      .optional(),
  })
  .merge(createProjectSchemaValidation);

export const patientStepperSchemaValidation = z
  .object({
    patients: z.object({
      patientName: z.string().min(1, { message: 'Name is required' }),
      patientPhone: z.string().min(1, { message: 'Phone is required' }),
    }),
  })
  .merge(productStepperSchemaValidation);

const fileSchema = z.object({
  files: z
    .array(
      z.object({
        file: z.instanceof(File),
      })
    )
    .refine((files) => files.length > 0, {
      message: 'At least one file is required!',
    }),
});

export const paymentStepperSchemaValidation = z
  .object()
  .merge(patientStepperSchemaValidation)
  .merge(fileSchema);
