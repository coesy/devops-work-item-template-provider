import { TemplateModel } from "./templateModel";
import { TemplatePartModel } from "./templatePartModel";
import Extension_Data = require("VSS/SDK/Services/ExtensionData");
import { IOptionsProvider } from "./iOptionsProvider";

/**
 * A provider that allows the CRUD functionality of templates
 */
export class TemplateProvider implements IOptionsProvider {

    public async UpsertDocument(DocumentName: string, DocumentChildren: TemplatePartModel[], DocumentId?: number): Promise<any> {
        VSS.getService(VSS.ServiceIds.ExtensionData).then(function(dataService: Extension_Data.ExtensionDataService) {
            // Create Template Model
            var tm: TemplateModel = {
                TemplateId: DocumentId,
                TemplateName: DocumentName,
                Children: DocumentChildren
            };

            dataService.setDocument("TemplateCollection",tm).then(function() {
                console.log("Did an Upsert on Id:" + DocumentId);
            });

            return tm;
        });
    }

    public GetTemplates(): TemplateModel[] {
        VSS.getService(VSS.ServiceIds.ExtensionData).then(function(dataService: Extension_Data.ExtensionDataService) {
            // Get all document under the collection
            dataService.getDocuments("TemplateCollection").then(function(docs) {
                 return docs;
            });
        });

        return null;
    }
}