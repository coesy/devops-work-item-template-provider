import { TemplateModel } from "../../shared/templateModel";

/**
 * State for `EditTemplateContainer`.
 */
export interface EditTemplateContainerState {
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
    selectedTemplate: TemplateModel,
    /**
     * Whether or not to show the template editor window.
     */
    showContent: boolean,
    /**
     * Whether or not the model has been changed.
     */
    changed: boolean
}