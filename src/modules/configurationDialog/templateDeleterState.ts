import { TemplateModel } from "../../shared/templateModel";

export interface TemplateDeleterState {
    templates: TemplateModel[],
    dropDownItems: {id:string, text:string}[],
    selectedTemplate: TemplateModel|undefined
}