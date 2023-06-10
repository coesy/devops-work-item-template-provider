import { TemplateModel } from "../../shared/templateModel";

/**
 * State used by `DeleteTemplateContainer`.
 */
export interface DeleteTemplateContainerState {
    /**
     * Set of template models loaded from SDK.
     */
    templates: TemplateModel[],
    /**
     * Set of dropdown items loaded from `templates`.
     */
    dropDownItems: {id: string, text: string}[],
    /**
     * Currently selected template.
     */
    selectedTemplate: TemplateModel|undefined
}