import { TemplateModel } from "../../shared/templateModel";

/**
 * State used by `NewTemplateContainer`.
 */
export interface NewTemplateContainerState {
    /**
     * Currently selected template.
     */
    selectedTemplate: TemplateModel,
    /**
     * Indicates whether or not the current model is valid.
     */
    modelValid: boolean
}