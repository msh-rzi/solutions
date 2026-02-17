'use client';

import { useMemo } from 'react';
import { permissionResolver } from '@/lib/form-schema/resolver';
import type { FieldDefinition, RequestContext, FieldsByAccess } from '@/lib/form-schema/types';

// ─── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Resolves field permissions for the current user context.
 * Memoized on context and field definitions reference.
 */
export function useFormPermissions(fields: FieldDefinition[], context: RequestContext): FieldsByAccess {
  return useMemo(
    () => permissionResolver.groupByAccess(fields, context),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [context.user.role, context.user.userId, context.formContext, fields],
  );
}
