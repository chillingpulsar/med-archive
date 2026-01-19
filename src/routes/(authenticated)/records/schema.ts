import { z } from 'zod/v4';

const baseSchema = {
    type: z.string().min(1, "Must select a type").default('outpatient').refine((value) => value === 'outpatient' || value === 'inpatient', {
        message: "Must select a valid type",
        path: ['type']
    }),
    first_name: z.string().min(1, "Must enter a first name"),
    middle_name: z.string().min(1, "Must enter a middle name"),
    last_name: z.string().min(1, "Must enter a last name"),
    gender: z.string().min(1, "Must select a gender").refine((value) => value === 'male' || value === 'female', {
        message: "Must select a valid gender",
        path: ['gender']
    }),
    date_of_birth: z.date('Must enter a date of birth'),
    date_visit: z.date('Must enter a date of visit'),
    doctor_specialization: z.string().min(1, "Must enter a doctor specialization"),
    doctor_name: z.string().min(1, "Must enter a doctor name"),
    chief_complaint: z.string().min(1, "Must enter a chief complaint"),
    diagnosis: z.string().min(1, "Must enter a diagnosis")
}

export const addRecordSchema = z.object(baseSchema).extend({
    consultation_details: z.object({
        visit_type: z.string().min(1, "Must select a visit type"),
        history_of_present_illness: z.string().min(1, "Must enter a history of present illness"),
        physical_examination: z.string().min(1, "Must enter a physical examination")
    }).optional(),
    treatment_plan: z.object({
        medicine_names: z.array(z.object({
            name: z.string().min(1, "Must enter a medicine name"),
            dosage: z.string().min(1, "Must enter a dosage"),
            frequency: z.string().min(1, "Must enter a frequency"),
            duration: z.string().min(1, "Must enter a duration"),
        })),
        tests_adviced: z.string().min(1, "Must enter a tests advised"),
    }).optional(),
    follow_up_details: z.object({
        date_of_follow_up: z.date('Must enter a date of follow up'),
        follow_up_notes: z.string().min(1, "Must enter a follow up notes"),
    }).optional(),
    billing_details: z.object({
        consultation_fee: z.number().min(1, "Must enter a consultation fee"),
        test_charges: z.array(z.object({
            name: z.string().min(1, "Must enter a test name"),
            amount: z.number().min(1, "Must enter a test amount"),
        })),
        payment_mode: z.string().min(1, 'Must select a payment mode').refine((value) => value === 'cash' || value === 'card' || value === 'cheque' || value === 'online', {
            message: "Must select a valid payment mode",
            path: ['payment_mode']
        }),
    }).optional()
})