import { IOptionsProvider } from "./iOptionsProvider";
import { TemplateModel } from "./templateModel";

/**
 * Static, temporary configuration to use in debugging/pre-configuration work.
 */
export class StaticTemplateProvider implements IOptionsProvider {
    async GetTemplates(): Promise<TemplateModel[]> {
        return [
            {
                TemplateName: 'Example Template',
                Children: [
                    {
                        IsExisting: false,
                        WorkItemNumber: 0,
                        Title: 'Development',
                        Attributes: []
                    },
                    {
                        IsExisting: false,
                        WorkItemNumber: 0,
                        Title: 'Test',
                        Attributes: []
                    },
                    {
                        IsExisting: false,
                        WorkItemNumber: 0,
                        Title: 'Sign Off',
                        Attributes: []
                    },
                    {
                        IsExisting: true,
                        WorkItemNumber: 1,
                        Title: 'First Work Item',
                        Attributes: []
                    }
                ]
            }
        ]
    }
}