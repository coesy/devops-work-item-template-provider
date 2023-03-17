/// <reference types="vss-web-extension-sdk" />
import * as ExtensionContracts from "TFS/WorkItemTracking/ExtensionContracts";
import { WorkItemFormService } from "TFS/WorkItemTracking/Services";

var provider = () => {
    debugger
    return {
        onLoaded: (workItemLoadedArgs: ExtensionContracts.IWorkItemLoadedArgs) => {
            debugger;
            var main = new Main(undefined, new StaticTemplateProvider());
            main.LoadSelect('sel');
            main.AssignButton('btn');
        }//,
//        onFieldChanged: (fieldChangedArgs: ExtensionContracts.IWorkItemFieldChangedArgs) => {
//            //var changedValue = fieldChangedArgs.changedFields[control.getFieldName()];
//            //if (changedValue !== undefined) {
//            //    control.updateExternal(changedValue);
//            //}
//            debugger;
//        }
    }
};

VSS.register('index', provider);

class Main {
    private templates: TemplateModel[];
    private select: HTMLSelectElement;

    public constructor(
        private vssProvider: IVSSProvider,
        private optionsProvider: IOptionsProvider) {

    }

    public LoadSelect(className: string) : void {
        this.EnsureOptionsAreLoaded();

        var jqueryElement = $(`.${className}`);
        this.select = jqueryElement[0] as HTMLSelectElement;
        this.templates.forEach(template => {
            jqueryElement.append($('<option>', { 
                value: template.TemplateName,
                text : template.TemplateName
            }));
        });
    }

    public AssignButton(className: string) : void {
        var thisRef = this;
        $(`.${className}`).on('click', () => {
            debugger;
            alert(thisRef.templates[thisRef.select.selectedIndex].TemplateName);
        });
    }

    private EnsureOptionsAreLoaded() {
        if (this.templates !== undefined) return;

        this.templates = this.optionsProvider.GetTemplates();
    }
}

interface IVSSProvider {

}

interface IOptionsProvider {
    GetTemplates() : TemplateModel[];
}

class TemplateModel {
    public TemplateName: string;
    public Children: TemplatePartModel[];
}

class TemplatePartModel {
    public IsExisting: boolean;
    public WorkItemNumber: string;
    public Title: string;
    public Attributes: TemplatePartCustomAttributeModel[];
}

class TemplatePartCustomAttributeModel {
    public Key: string;
    public Value: string;
}

class StaticTemplateProvider implements IOptionsProvider {
    GetTemplates(): TemplateModel[] {
        return [
            {
                TemplateName: 'First Work Item',
                Children: [
                    {
                        IsExisting: false,
                        WorkItemNumber: '',
                        Title: 'Development',
                        Attributes: []
                    },
                    {
                        IsExisting: false,
                        WorkItemNumber: '',
                        Title: 'Test',
                        Attributes: []
                    },
                    {
                        IsExisting: false,
                        WorkItemNumber: '',
                        Title: 'Sign Off',
                        Attributes: []
                    },
                    {
                        IsExisting: true,
                        WorkItemNumber: '1',
                        Title: 'First Work Item',
                        Attributes: []
                    }
                ]
            }
        ]
    }
}