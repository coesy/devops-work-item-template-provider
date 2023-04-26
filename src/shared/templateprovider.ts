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
    constructor(private extensionDataManager: IExtensionDataManager) {
        this.CreateDocument = this.CreateDocument.bind(this);
        this.GetTemplates = this.GetTemplates.bind(this);
        this.ClearTemplates = this.ClearTemplates.bind(this);
    }

    public async CreateDocument(templateModel: TemplateModel): Promise<TemplateModel> {
        if (templateModel.id !== undefined)
            throw new Error('Unable to create a model with an ID');

        return await this.extensionDataManager.createDocument('TemplateCollection', templateModel);
    }

    public async GetTemplates(): Promise<TemplateModel[]> {
        return await this.extensionDataManager.getDocuments('TemplateCollection');
    }

    public async ClearTemplates() {
        (await this.extensionDataManager.getDocuments('TemplateCollection')).forEach(async (document: TemplateModel) => {
            debugger;
            await this.extensionDataManager.deleteDocument('TemplateCollection', document.id!);
        });
    }

    public async UpdateTemplate(templateModel:TemplateModel): Promise<void> {
debugger;
        await this.extensionDataManager.updateDocument('TemplateCollection', templateModel);
    }

    public async DeleteTemplate(id: string): Promise<void> {
        await this.extensionDataManager.deleteDocument('TemplateCollection', id);
    }
}