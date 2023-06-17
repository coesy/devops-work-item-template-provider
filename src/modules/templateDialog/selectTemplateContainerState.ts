import { TemplateModel } from "../../shared/templateModel";

export interface SelectTemplateContainerState {
    templates: TemplateModel[],
    selectedTemplate: TemplateModel
}