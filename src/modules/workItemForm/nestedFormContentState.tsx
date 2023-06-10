import { TemplateModel } from "../../shared/templateModel";

/**
 * State used by `WorkItemFormContent`.
 */
export interface WorkItemFormContentState {
    /**
     * Currently selected template.
     */
    selectedTemplate: TemplateModel|undefined
}