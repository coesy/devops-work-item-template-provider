import { TemplateModel } from "./templateModel";
import { TemplatePartModel } from "./templatePartModel";
import Extension_Data = require("VSS/SDK/Services/ExtensionData");
import { IOptionsProvider } from "./iOptionsProvider";

/**
 * A provider that allows the CRUD functionality of templates
 */
export class TemplateProvider implements IOptionsProvider {

    public async CreateDocument(DocumentName: string, DocumentChildren: TemplatePartModel[], DocumentId?: number): Promise<any> {
        VSS.getService(VSS.ServiceIds.ExtensionData).then(function(dataService: Extension_Data.ExtensionDataService) {
            // Create Template Model
            var tm: TemplateModel = {
                TemplateName: DocumentName,
                Children: DocumentChildren
            };

            dataService.createDocument("TemplateCollection",tm).then(function(doc) {
                console.log("Did an Insert with Id:" + doc.id);
            });

            return tm;
        });
    }

    public GetTemplates(): TemplateModel[] {
        VSS.getService(VSS.ServiceIds.ExtensionData).then(function(dataService: Extension_Data.ExtensionDataService) {
            // Get all document under the collection
            dataService.getDocuments("TemplateCollection").then(function(docs) {
                 console.log("There are " + docs.length + " in the collection.");
                 return docs;
            });
        });

        return null;
    }
}