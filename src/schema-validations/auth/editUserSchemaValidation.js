import { z as zod } from 'zod';

export const editUserSchemaValidation = zod.object({
  photo: zod.any().refine(
    (data, ctx) => {
      // Cek jika file adalah instance File atau string dan panjangnya lebih dari 0
      const hasFile = data instanceof File || (typeof data === 'string' && !!data.length);

      // Menentukan apakah foto ini opsional atau wajib
      const isOptional = ctx?.parent?.photo === undefined || ctx?.parent?.photo === null;

      // Jika file tidak ada dan ini wajib, maka tampilkan pesan error
      if (!hasFile && !isOptional) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'File is required!',
        });
        return false;
      }

      return true; // Jika file ada atau tidak diperlukan, validasi sukses
    },
    {
      message: 'Invalid file type!',
    }
  ),
  fullname: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phone: zod.string().min(1, { message: 'Phone is required!' }),
  password: zod.string().optional(),
  country: zod.string().optional(),
  state: zod.string().optional(),
  city: zod.string().optional(),
  address: zod.string().optional(),
  role_id: zod.string().min(1, { message: 'Role is required!' }),
  description: zod.string().optional(),
});
