/**
 * Represents a custom attribute associated with a `TemplateModel`.
 */
export interface TemplateModelAttribute {
    /**
     * Whether or not to apply the attribute.
     */
    toApply: boolean,
    /**
     * Value of the attribute to assign.
     */
    value: string
}