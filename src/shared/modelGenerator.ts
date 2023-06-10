import { TemplateModel } from "./templateModel";
import { TemplatePartModel } from "./templatePartModel";
import { TemplatePartModelExistingType } from "./templatePartModelExistingType";

/**
 * A generator which can be used to generate default objects.
 */
export class ModelGenerator {
    /**
     * Creates a new TemplateModel object with default members.
     */
    public defaultTemplateModel() : TemplateModel {
        return {
            id: undefined,
            templateName: '',
            description: '',
            children: [],
            workItemDescription: {
                toApply: false,
                value: ''
            }
        };
    }

    /**
     * Creates a new TemplatePartModel object with default members.
     * @param isExisting - Whether or not the default model represents an existing target.
     */
    public newTemplatePartModel(isExisting: boolean) : TemplatePartModel {
        return {
            id: crypto.randomUUID(),
            isExisting,
            workItemNumber: -1,
            title: isExisting ? 'Title will be loaded in on save..' : 'Example Title',
            attributes: [],
            description: '',
            copyType: isExisting ? TemplatePartModelExistingType.Link : TemplatePartModelExistingType.NotApplicable
        };
    }
}