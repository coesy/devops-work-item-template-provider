import { TemplatePartModelExistingType } from "../../shared/templatePartModelExistingType";

/**
 * State used by `WorkItemTaskSelectorContent`.
 */
export interface WorkItemTaskSelectorContentState {
    isExisting: boolean,
    existingWorkItemValue: string,
    existingWorkItemReferenceType: TemplatePartModelExistingType,
    newWorkItemTitle: string,
    newWorkItemDescription: string,
    newWorkItemEstimate: string,
}