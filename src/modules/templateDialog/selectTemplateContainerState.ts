import { TemplateModel } from "../../shared/templateModel";

export interface SelectTemplateContainerState {
    templates: TemplateModel[],
    selectedTemplate: TemplateModel,
    dropDownItems: {id: string, text: string}[],
    itemSelected: boolean
}