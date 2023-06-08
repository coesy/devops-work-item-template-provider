import { TemplateModel } from "../../shared/templateModel";
import { TemplatePartModel } from "../../shared/templatePartModel";

export class ModelGenerator {
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

    public defaultTemplatePartModel() : TemplatePartModel {
        return {
            id: '',
            isExisting: false,
            workItemNumber: -1,
            title: '',
            attributes: [],
            description: ''
        };
    }

    public newTemplatePartModel(isExisting: boolean) : TemplatePartModel {
        return {
            id: crypto.randomUUID(),
            isExisting,
            workItemNumber: -1,
            title: isExisting ? 'Title will be loaded in on save..' : 'Example Title',
            attributes: [],
            description: ''
        };
    }
}