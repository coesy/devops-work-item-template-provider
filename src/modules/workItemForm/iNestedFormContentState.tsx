import { TemplateLoadingProcessor } from "../../shared/templateLoadingProcessor";
import { TemplateModel } from "../../shared/templateModel";

export interface INestedFormContentState {
    templates: TemplateModel[];
    templateLoadingProcessor: TemplateLoadingProcessor;
}