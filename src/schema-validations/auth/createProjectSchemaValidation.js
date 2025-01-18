import { z as zod } from 'zod';

export const createProjectSchemaValidation = zod.object({
  title: zod.string().min(1, { message: 'Title project is required!' }),
  description: zod.string().min(1, { message: 'Description project is required!' }),
});
