import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company must be at least 2 characters').max(100, 'Company must be less than 100 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 characters').max(20, 'Phone must be less than 20 characters'),
  jobTitle: z.string().min(2, 'Job title must be at least 2 characters').max(100, 'Job title must be less than 100 characters'),
  status: z.enum(['active', 'inactive', 'lead', 'archived']),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
