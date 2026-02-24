import type {
  FieldDefinition,
  ResolvedField,
  RequestContext,
  FieldAccessLevel,
  FieldsByAccess,
} from './types';

// ─── Permission Resolver ───────────────────────────────────────────────────────

export class PermissionResolver {
  private resolveVisibility(field: FieldDefinition, context: RequestContext): boolean {
    const { visibilityRules } = field;
    if (!visibilityRules || visibilityRules.length === 0) return true;

    return visibilityRules.every((rule) => {
      switch (rule.type) {
        case 'role':
          if (rule.operator === 'equals') return context.user.role === rule.value;
          if (rule.operator === 'includes' && Array.isArray(rule.value)) {
            return (rule.value as string[]).includes(context.user.role);
          }
          return true;

        case 'context':
          if (rule.operator === 'equals') return context.formContext === rule.value;
          return true;

        case 'attribute':
          if (rule.operator === 'equals' && typeof rule.value === 'object' && rule.value !== null) {
            const { key, value } = rule.value as { key: string; value: unknown };
            return context.user.attributes?.[key] === value;
          }
          return true;

        case 'custom':
          return rule.customFn ? rule.customFn(context) : true;

        default:
          return true;
      }
    });
  }

  private resolvePermission(field: FieldDefinition, context: RequestContext): FieldAccessLevel {
    for (const rule of field.permissionRules) {
      if (rule.customFn) {
        const result = rule.customFn(context);
        if (result !== 'hidden') return result;
        continue;
      }

      const roleMatch = !rule.roles || rule.roles.includes(context.user.role);
      const contextMatch = !rule.contexts || rule.contexts.includes(context.formContext);

      if (roleMatch && contextMatch) return rule.accessLevel;
    }

    return 'hidden';
  }

  /**
   * Resolves a single field's visibility, access level, and required status
   * for the given request context.
   */
  resolveField(field: FieldDefinition, context: RequestContext): ResolvedField {
    const isVisible = this.resolveVisibility(field, context);
    const accessLevel = this.resolvePermission(field, context);
    const isRequired = field.required === true && accessLevel === 'editable' && isVisible;

    return {
      ...field,
      isVisible,
      accessLevel,
      isRequired,
    };
  }

  /**
   * Resolves all fields in the schema for the given context.
   */
  resolveFields(fields: FieldDefinition[], context: RequestContext): ResolvedField[] {
    return fields.map((field) => this.resolveField(field, context));
  }

  /**
   * Returns fields grouped by access tier — useful for analytics panels.
   */
  groupByAccess(fields: FieldDefinition[], context: RequestContext): FieldsByAccess {
    const resolved = this.resolveFields(fields, context);

    return {
      visible: resolved.filter((f) => f.isVisible && f.accessLevel !== 'hidden'),
      editable: resolved.filter((f) => f.accessLevel === 'editable'),
      readonly: resolved.filter((f) => f.isVisible && f.accessLevel === 'readonly'),
      hidden: resolved.filter((f) => !f.isVisible || f.accessLevel === 'hidden'),
    };
  }
}

export const permissionResolver = new PermissionResolver();
