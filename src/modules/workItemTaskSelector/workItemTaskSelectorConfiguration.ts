import { Observable } from "azure-devops-ui/Core/Observable";
import { TemplateModel } from "../../shared/templateModel";

export interface WorkItemTaskSelectorConfiguration {
    parentId: number,
    templateModel: Observable<TemplateModel>
}