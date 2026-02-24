import type { FormSchema, FormSubmission, FilteredSubmission } from "./types";
import { permissionResolver } from "./resolver";

// ─── Input Filter ──────────────────────────────────────────────────────────────

export class InputFilter {
  /**
   * Filters and validates a form submission against the schema's RBAC rules.
   * Fields outside the user's write-access scope are silently rejected.
   */
  filterSubmission(
    schema: FormSchema,
    submission: FormSubmission,
  ): FilteredSubmission {
    const resolvedFields = permissionResolver.resolveFields(
      schema.fields,
      submission.context,
    );

    const allowedData: Record<string, unknown> = {};
    const rejectedFields: string[] = [];
    const validationErrors: Record<string, string> = {};

    for (const [key, value] of Object.entries(submission.data)) {
      const field = resolvedFields.find((f) => f.id === key);

      // Reject unknown or non-visible fields
      if (!field || !field.isVisible || field.accessLevel === "hidden") {
        rejectedFields.push(key);
        continue;
      }

      // Reject writes to readonly fields (privilege escalation guard)
      if (field.accessLevel === "readonly") {
        rejectedFields.push(key);
        continue;
      }

      let processedValue: unknown = value;

      // Apply sanitizer first
      if (field.sanitize) {
        processedValue = field.sanitize(processedValue);
      }

      // Apply transformer
      if (field.transform) {
        processedValue = field.transform(processedValue);
      }

      // Run Zod schema validation
      if (field.validationSchema) {
        const result = field.validationSchema.safeParse(processedValue);
        if (!result.success) {
          validationErrors[key] =
            result.error.issues[0]?.message ?? "Invalid value";
          continue;
        }
        processedValue = result.data;
      }

      // Required field check
      if (
        field.isRequired &&
        (processedValue === undefined ||
          processedValue === null ||
          processedValue === "")
      ) {
        validationErrors[key] = `${field.label} is required`;
        continue;
      }

      allowedData[key] = processedValue;
    }

    // Check for required editable fields that were missing entirely from submission
    for (const field of resolvedFields) {
      if (
        field.isRequired &&
        field.accessLevel === "editable" &&
        !(field.id in submission.data)
      ) {
        validationErrors[field.id] = `${field.label} is required`;
      }
    }

    return {
      allowedData,
      rejectedFields,
      validationErrors:
        Object.keys(validationErrors).length > 0 ? validationErrors : undefined,
    };
  }

  /**
   * Convenience wrapper — returns a simple isValid/errors object.
   */
  validateSubmission(
    schema: FormSchema,
    submission: FormSubmission,
  ): { isValid: boolean; errors?: Record<string, string> } {
    const filtered = this.filterSubmission(schema, submission);

    if (filtered.validationErrors) {
      return { isValid: false, errors: filtered.validationErrors };
    }

    return { isValid: true };
  }
}

export const inputFilter = new InputFilter();
