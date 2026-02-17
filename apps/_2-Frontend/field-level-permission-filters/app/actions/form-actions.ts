'use server';

import type { FormSubmission, FilteredSubmission } from '@/lib/form-schema/types';
import { inputFilter } from '@/lib/form-schema/filter';
import { employeeFormSchema } from '@/lib/form-schema/schemas';

// ─── Constants ────────────────────────────────────────────────────────────────

const SIMULATED_LATENCY_MS = 500;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SubmitFormResult extends FilteredSubmission {
  success: boolean;
  message: string;
  timestamp: string;
}

export interface FormDataResult {
  data: Record<string, unknown>;
  loadedAt: string;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

/**
 * Submits a form with server-side RBAC filtering and validation.
 * Rejects fields the user has no write access to — even if injected client-side.
 */
export async function submitForm(submission: FormSubmission): Promise<SubmitFormResult> {
  const schema = employeeFormSchema;
  const filtered = inputFilter.filterSubmission(schema, submission);

  console.group('=== SERVER-SIDE FILTERING ===');
  console.log('User Role     :', submission.context.user.role);
  console.log('Form Context  :', submission.context.formContext);
  console.log('Submitted     :', Object.keys(submission.data));
  console.log('Allowed       :', Object.keys(filtered.allowedData));
  console.log('Rejected      :', filtered.rejectedFields);
  if (filtered.validationErrors) {
    console.warn('Validation Errors:', filtered.validationErrors);
  }
  console.groupEnd();

  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));

  const hasErrors = Boolean(filtered.validationErrors && Object.keys(filtered.validationErrors).length > 0);

  return {
    ...filtered,
    success: !hasErrors,
    message: hasErrors
      ? `Form has ${Object.keys(filtered.validationErrors!).length} validation error(s).`
      : `${Object.keys(filtered.allowedData).length} field(s) saved successfully.`,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Loads pre-populated employee data for demo/edit purposes.
 * In production, this would fetch from your DB by userId.
 */
export async function getFormData(_userId: string): Promise<FormDataResult> {
  // Simulate DB fetch
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phoneNumber: '+1 (555) 123-4567',
      department: 'engineering',
      jobTitle: 'Senior Software Engineer',
      salary: 125000,
      ssn: '123-45-6789',
      startDate: '2020-01-15',
      isActive: true,
      notes: 'Excellent performer, promoted in 2023',
    },
    loadedAt: new Date().toISOString(),
  };
}
