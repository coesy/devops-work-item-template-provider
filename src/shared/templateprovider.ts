import { TemplateModel } from './templateModel';
import { TemplatePartModel } from './templatePartModel';
import * as SDK from 'azure-devops-extension-sdk/SDK';
import { IOptionsProvider } from './iOptionsProvider';
import * as $ from 'jquery';
import { CommonServiceIds, IExtensionDataManager, IExtensionDataService } from 'azure-devops-extension-api/Common/CommonServices';

/**
 * A provider that allows the CRUD functionality of templates
 */
export class TemplateProvider implements IOptionsProvider {

    public async CreateDocument(DocumentName: string, DocumentChildren: TemplatePartModel[]): Promise<any> {
        // Create Template Model
        var templateModel: TemplateModel = {
            TemplateName: DocumentName,
            Children: DocumentChildren
        };

        var extensionDataManager = await this.GetExtensionDataClient();
        extensionDataManager.createDocument('TemplateCollection', templateModel).then(function(doc) {
            console.log('Did an Insert with Id:' + doc.id);
        });

        return templateModel;
    }

    public async GetTemplates(): Promise<TemplateModel[]> {
        var extensionDataManager = await this.GetExtensionDataClient();
        // Get all documents in the collection
        var docs: TemplateModel[]  = await extensionDataManager.getDocuments('TemplateCollection');
        return docs;
    }

    public async ClearTemplates() {
        var extensionDataManager = await this.GetExtensionDataClient();

        var docs: TemplateModel[]  = await extensionDataManager.getDocuments('TemplateCollection');
        for (var i = 0; i < docs.length; i++) {
            // TODO: This was docs[i]['id] ?
            var id = docs[i].TemplateName;
            await extensionDataManager.deleteDocument('TemplateCollection', id);
          }
    }

    private async GetExtensionDataClient() : Promise<IExtensionDataManager> {
        var dataService = await SDK.getService<IExtensionDataService>(CommonServiceIds.ExtensionDataService);
        
        return await dataService.getExtensionDataManager(
            'CodeBoost.devops-work-item-template-provider',
            await SDK.getAccessToken()
        );
    }
}