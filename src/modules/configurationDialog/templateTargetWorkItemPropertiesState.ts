import { TemplateModel } from "../../shared/templateModel";
import { TemplatePartModel } from "../../shared/templatePartModel";

export interface TemplateTargetWorkItemPropertiesState {
    templateModel: TemplateModel,
    templateChildren: TemplatePartModel[]
}