import { TemplateModel } from "../../shared/templateModel";
import { TemplatePartModel } from "../../shared/templatePartModel";

/**
 * State used by `TemplateItemPropertiesEditor`.
 */
export interface TemplateItemPropertiesEditorState {
    /**
     * Template model to which these properties pertains.
     */
    templateModel: TemplateModel
}