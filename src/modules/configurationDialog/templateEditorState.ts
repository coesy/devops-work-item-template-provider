import { TemplateModel } from "../../shared/templateModel";

export interface TemplateEditorState {
    templates: TemplateModel[],
    dropDownItems: {id:string, text:string}[],
    selectedTemplate: TemplateModel,
    showContent: boolean,
    changed: boolean
}