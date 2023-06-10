import { TemplateModel } from "../../shared/templateModel";

/**
 * State used by `TemplateItemEditor`.
 */
export interface TemplateItemEditorState {
    /**
     * Currently selected template model.
     */
    templateModel: TemplateModel
}