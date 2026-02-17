"use client";

import { useCallback, useTransition } from "react";
import { notifications } from "@repo/ui-mantine";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import type { FormSubmission } from "@/lib/form-schema/types";
import { submitForm, type SubmitFormResult } from "@/app/actions/form-actions";
import type { RequestContext } from "@/lib/form-schema/types";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface UseFormSubmitOptions {
  formId: string;
  context: RequestContext;
  onSuccess?: (result: SubmitFormResult) => void;
  onError?: (result: SubmitFormResult) => void;
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useFormSubmit({
  formId,
  context,
  onSuccess,
  onError,
}: UseFormSubmitOptions) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = useCallback(
    async (data: Record<string, unknown>): Promise<SubmitFormResult> => {
      const submission: FormSubmission = { formId, data, context };

      // Optimistic "submitting" toast
      const toastId = `form-submit-${Date.now()}`;
      notifications.show({
        id: toastId,
        title: "Saving changes…",
        message: "Your data is being validated server-side.",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });

      let result!: SubmitFormResult;

      await new Promise<void>((resolve) => {
        startTransition(async () => {
          try {
            result = await submitForm(submission);

            if (result.success) {
              notifications.update({
                id: toastId,
                title: "Changes saved",
                message: result.message,
                color: "green",
                icon: <CheckCircle2 size={18} />,
                loading: false,
                autoClose: 4000,
                withCloseButton: true,
              });
              onSuccess?.(result);
            } else {
              const errorCount = Object.keys(
                result.validationErrors ?? {},
              ).length;
              notifications.update({
                id: toastId,
                title: "Validation failed",
                message: `${errorCount} error${errorCount !== 1 ? "s" : ""} found. Please review highlighted fields.`,
                color: "red",
                icon: <XCircle size={18} />,
                loading: false,
                autoClose: 6000,
                withCloseButton: true,
              });
              onError?.(result);
            }

            // Show rejected fields warning if any
            if (result.rejectedFields.length > 0) {
              notifications.show({
                title: "Fields not saved",
                message: `${result.rejectedFields.length} field(s) were blocked by server-side RBAC: ${result.rejectedFields.join(", ")}`,
                color: "orange",
                icon: <AlertTriangle size={18} />,
                autoClose: 7000,
                withCloseButton: true,
              });
            }
          } catch (err) {
            notifications.update({
              id: toastId,
              title: "Unexpected error",
              message:
                err instanceof Error
                  ? err.message
                  : "Something went wrong. Please try again.",
              color: "red",
              icon: <XCircle size={18} />,
              loading: false,
              autoClose: 5000,
              withCloseButton: true,
            });

            result = {
              allowedData: {},
              rejectedFields: [],
              success: false,
              message: "Network or server error",
              timestamp: new Date().toISOString(),
            };

            onError?.(result);
          } finally {
            resolve();
          }
        });
      });

      return result;
    },
    [formId, context, onSuccess, onError],
  );

  return { handleSubmit, isPending };
}
