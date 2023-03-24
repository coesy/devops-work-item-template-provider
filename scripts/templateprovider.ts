import { TemplateModel } from "./templateModel";
import { TemplatePartModel } from "./templatePartModel";
import Extension_Data = require("VSS/SDK/Services/ExtensionData");
import { IOptionsProvider } from "./iOptionsProvider";

/**
 * A provider that allows the CRUD functionality of templates
 */
export class TemplateProvider implements IOptionsProvider {

    public async CreateDocument(DocumentName: string, DocumentChildren: TemplatePartModel[]): Promise<any> {
        var dataService: Extension_Data.ExtensionDataService = await VSS.getService(VSS.ServiceIds.ExtensionData);
        // Create Template Model
        var tm: TemplateModel = {
            TemplateName: DocumentName,
            Children: DocumentChildren
        };

        await dataService.createDocument("TemplateCollection",tm).then(function(doc) {
            console.log("Did an Insert with Id:" + doc.id);
        });

        return tm;
    }

    public async GetTemplates(): Promise<TemplateModel[]> {
        var dataService: Extension_Data.ExtensionDataService = await VSS.getService(VSS.ServiceIds.ExtensionData);
        // Get all document under the collection
        debugger;
        var docs = await dataService.getDocuments("TemplateCollection")

        return null;
    }
}