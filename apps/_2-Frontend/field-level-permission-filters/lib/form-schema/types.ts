import { z } from 'zod';

// ─── Core Domain Types ─────────────────────────────────────────────────────────

export type UserRole = 'employee' | 'manager' | 'admin';

export type FormContext = 'create' | 'edit' | 'review';

export type FieldType = 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox';

export type FieldAccessLevel = 'hidden' | 'readonly' | 'editable';

// ─── Context Types ─────────────────────────────────────────────────────────────

export interface UserContext {
  role: UserRole;
  userId: string;
  departmentId?: string;
  attributes?: Record<string, unknown>;
}

export interface RequestContext {
  formContext: FormContext;
  user: UserContext;
  entityId?: string;
}

// ─── Rule Types ────────────────────────────────────────────────────────────────

export interface VisibilityRule {
  type: 'role' | 'attribute' | 'context' | 'custom';
  operator?: 'equals' | 'includes' | 'notEquals' | 'custom';
  value?: unknown;
  customFn?: (ctx: RequestContext) => boolean;
}

export interface PermissionRule {
  roles?: UserRole[];
  contexts?: FormContext[];
  accessLevel: FieldAccessLevel;
  customFn?: (ctx: RequestContext) => FieldAccessLevel;
}

// ─── Field Types ───────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  description?: string;
  defaultValue?: unknown;
  options?: SelectOption[];
  visibilityRules?: VisibilityRule[];
  permissionRules: PermissionRule[];
  validationSchema?: z.ZodTypeAny;
  transform?: (value: unknown) => unknown;
  sanitize?: (value: unknown) => unknown;
}

export interface ResolvedField extends FieldDefinition {
  accessLevel: FieldAccessLevel;
  isVisible: boolean;
  isRequired: boolean;
}

// ─── Form Schema Types ─────────────────────────────────────────────────────────

export interface FormSchema {
  id: string;
  name: string;
  description: string;
  fields: FieldDefinition[];
}

// ─── Submission Types ──────────────────────────────────────────────────────────

export interface FormSubmission {
  formId: string;
  data: Record<string, unknown>;
  context: RequestContext;
}

export interface FilteredSubmission {
  allowedData: Record<string, unknown>;
  rejectedFields: string[];
  validationErrors?: Record<string, string>;
}

// ─── Derived / Utility Types ───────────────────────────────────────────────────

export type FieldsByAccess = {
  visible: ResolvedField[];
  editable: ResolvedField[];
  readonly: ResolvedField[];
  hidden: ResolvedField[];
};
