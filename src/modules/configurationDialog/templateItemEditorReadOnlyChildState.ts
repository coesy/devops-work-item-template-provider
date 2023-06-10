import { TemplateModel } from "../../shared/templateModel";

/**
 * State used by `TemplateItemEditorReadOnly`.
 */
export interface TemplateItemEditorReadOnlyChildState {
    /**
     * Whether or not the UI has been expanded.
     */
    expanded: boolean,
    /**
     * Model to which this child pertains.
     */
    templateModel: TemplateModel
}