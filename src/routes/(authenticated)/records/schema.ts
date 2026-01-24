import { z } from 'zod/v4';

// ---------------------------------------------------------------------------
// Shared (both OPD and Inpatient)
// ---------------------------------------------------------------------------
const baseSchema = {
	type: z.enum(['outpatient', 'inpatient']).default('outpatient'),
	first_name: z.string().min(1, 'Must enter a first name'),
	middle_name: z.string().min(1, 'Must enter a middle name'),
	last_name: z.string().min(1, 'Must enter a last name'),
	gender: z.enum(['male', 'female']),
	date_of_birth: z.date({ message: 'Must enter a date of birth' }),
	date_visit: z.date({ message: 'Must enter a date of visit' }), // OPD: visit date | IP: admission date
	doctor_specialization: z.string().min(1, 'Must enter a doctor specialization'),
	doctor_name: z.string().min(1, 'Must enter a doctor name'),
	chief_complaint: z.string().min(1, 'Must enter a chief complaint'),
	diagnosis: z.string().min(1, 'Must enter a diagnosis')
};

// ---------------------------------------------------------------------------
// OPD: visit_type. Inpatient: not used.
// ---------------------------------------------------------------------------
const consultationDetailsSchema = z.object({
	visit_type: z.string().min(1, 'Must select a visit type'), // first visit | follow-up | emergency
	history_of_present_illness: z.string().min(1, 'Must enter a history of present illness'),
	physical_examination: z.string().min(1, 'Must enter a physical examination')
});

// ---------------------------------------------------------------------------
// Inpatient only (ward, admission_notes; date_visit = admission; discharge_date here)
// ---------------------------------------------------------------------------
const inpatientDetailsSchema = z.object({
	discharge_date: z.date().optional(), // omit if still admitted
	ward: z.string().min(1, 'Must enter a ward'),
	admission_notes: z.string().min(1, 'Must enter admission notes')
});

// ---------------------------------------------------------------------------
// Both: meds + tests
// ---------------------------------------------------------------------------
const treatmentPlanSchema = z.object({
	medicine_names: z.array(
		z.object({
			name: z.string().min(1, 'Must enter a medicine name'),
			dosage: z.string().min(1, 'Must enter a dosage'),
			frequency: z.string().min(1, 'Must enter a frequency'),
			duration: z.string().min(1, 'Must enter a duration')
		})
	),
	tests_adviced: z.string().min(1, 'Must enter tests advised')
});

// ---------------------------------------------------------------------------
// Both: follow-up after visit / after discharge
// ---------------------------------------------------------------------------
const followUpDetailsSchema = z.object({
	date_of_follow_up: z.date({ message: 'Must enter a date of follow up' }),
	follow_up_notes: z.string().min(1, 'Must enter follow up notes')
});

const paymentModeSchema = z.enum(['cash', 'card', 'cheque', 'online']);

const testChargeSchema = z.object({
	name: z.string().min(1, 'Must enter a test name'),
	amount: z.number().min(0, 'Must enter a valid test amount')
});

const procedureChargeSchema = z.object({
	name: z.string().min(1, 'Must enter a procedure name'),
	amount: z.number().min(0, 'Must enter a valid amount')
});

// ---------------------------------------------------------------------------
// Billing: OPD uses consultation_fee; Inpatient uses room_charges + procedure_charges
// test_charges and payment_mode are used for both
// ---------------------------------------------------------------------------
const billingDetailsSchema = z.object({
	consultation_fee: z.number().min(0).optional(), // OPD: required when type=outpatient
	test_charges: z.array(testChargeSchema).default([]),
	payment_mode: paymentModeSchema,
	room_charges: z.number().min(0).optional(), // Inpatient: required when type=inpatient
	procedure_charges: z.array(procedureChargeSchema).optional(), // Inpatient
	pharmacy_charges: z.number().min(0).optional() // Inpatient
});

// ---------------------------------------------------------------------------
// Main schema + conditional rules
// ---------------------------------------------------------------------------
export const addRecordSchema = z
	.object(baseSchema)
	.extend({
		consultation_details: consultationDetailsSchema.optional(), // required when type=outpatient
		inpatient_details: inpatientDetailsSchema.optional(), // required when type=inpatient
		treatment_plan: treatmentPlanSchema.optional(),
		follow_up_details: followUpDetailsSchema.optional(),
		billing_details: billingDetailsSchema.optional()
	})
	.superRefine((data, ctx) => {
		if (data.type === 'outpatient') {
			if (!data.consultation_details) {
				ctx.addIssue({
					code: 'custom',
					message: 'Consultation details are required for outpatient',
					path: ['consultation_details']
				});
			}
			if (!data.billing_details) {
				ctx.addIssue({
					code: 'custom',
					message: 'Billing details are required for outpatient',
					path: ['billing_details']
				});
			} else if (data.billing_details.consultation_fee == null) {
				ctx.addIssue({
					code: 'custom',
					message: 'Consultation fee is required for outpatient',
					path: ['billing_details', 'consultation_fee']
				});
			}
		}
		if (data.type === 'inpatient') {
			if (!data.inpatient_details) {
				ctx.addIssue({
					code: 'custom',
					message: 'Inpatient details are required for inpatient',
					path: ['inpatient_details']
				});
			}
			if (!data.billing_details) {
				ctx.addIssue({
					code: 'custom',
					message: 'Billing details are required for inpatient',
					path: ['billing_details']
				});
			} else {
				if (data.billing_details.room_charges == null) {
					ctx.addIssue({
						code: 'custom',
						message: 'Room charges are required for inpatient',
						path: ['billing_details', 'room_charges']
					});
				}
				if (!data.billing_details.procedure_charges) {
					ctx.addIssue({
						code: 'custom',
						message: 'Procedure charges are required for inpatient (can be empty array)',
						path: ['billing_details', 'procedure_charges']
					});
				}
			}
		}
	});

export type AddRecordSchema = z.infer<typeof addRecordSchema>;
