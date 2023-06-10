/**
 * Defines a set of how a target existing work item is linked to a `TemplatePartModel`.
 */
export enum TemplatePartModelExistingType {
    /**
     * The model does not refer to a target existing work item.
     */
    NotApplicable,
    /**
     * The target existing work item is to be added as a link.
     */
    Link,
    /**
     * The target existing work item is to be added as a carbon copy.
     */
    Copy
}