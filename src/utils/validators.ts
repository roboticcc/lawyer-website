import * as zod from 'zod'

export const phoneRegex = /^\+7[0-9]{10}$/

export const consultationSchema = zod.object({
  name: zod.string().min(2, 'Пожалуйста, укажите ваше имя'),
  phone: zod
    .string()
    .regex(phoneRegex, 'Неверный формат: +7XXXXXXXXXX')
    .min(12, 'Введите номер полностью'),
  service: zod.string().optional(),
  agree: zod.boolean().refine((v) => v === true, 'Необходимо согласие'),
})

export const contactSchema = zod.object({
  name: zod.string().min(2, 'Пожалуйста, укажите ваше имя'),
  email: zod.string().email('Неверный формат email').optional().or(zod.literal('')),
  phone: zod
    .string()
    .regex(phoneRegex, 'Неверный формат: +7XXXXXXXXXX')
    .min(12, 'Введите номер полностью'),
  message: zod.string().optional(),
  agree: zod.boolean().refine((v) => v === true, 'Необходимо согласие'),
})

export type ConsultationSchema = zod.infer<typeof consultationSchema>
export type ContactSchema = zod.infer<typeof contactSchema>
