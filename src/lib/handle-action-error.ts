import { type SafeActionResult } from "next-safe-action";
import { type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { type ValidationError } from "~/lib/exceptions";

export function handleActionError(
  err: SafeActionResult<any, any, any>,
  form: UseFormReturn<Record<string, unknown>>
) {
  if (err.validationErrors) {
    if (err.validationErrors.fieldErrors) {
      Object.keys(err.validationErrors.fieldErrors ?? {}).forEach((key) => {
        form.setError(key, {
          message: err.validationErrors.fieldErrors[key][0],
        });
      });
    }
  } else if (err.serverError) {
    if (err.serverError.name === "ValidationError") {
      const e = err.serverError as ValidationError;

      if (e.fieldErrors) {
        Object.keys(e.fieldErrors || {}).forEach((key) => {
          form.setError(key, {
            message: e.fieldErrors[key]?.[0],
          });
        });
      }
    } else {
      toast.error(err.serverError.message);
    }
  }
}
