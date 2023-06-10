import { TemplateModel } from './templateModel';
import { OptionsProvider } from './OptionsProvider';
import { IExtensionDataManager } from 'azure-devops-extension-api/Common/CommonServices';

/**
 * A provider that allows the CRUD functionality of templates into SDK config storage.
 */
export class TemplateProvider implements OptionsProvider {
    /**
     * Creates a new instance of `TemplateProvider`.
     */
    constructor(private extensionDataManager: IExtensionDataManager) {
        this.CreateDocument = this.CreateDocument.bind(this);
        this.GetTemplates = this.GetTemplates.bind(this);
        this.ClearTemplates = this.ClearTemplates.bind(this);
    }

    /**
     * Creates a new template config in the SDK.
     * @param templateModel - Template model to create.
     * @returns Created model (inclusive of new ID).
     */
    public async CreateDocument(templateModel: TemplateModel): Promise<TemplateModel> {
        if (templateModel.id !== undefined)
            throw new Error('Unable to create a model with an ID');

        return await this.extensionDataManager.createDocument('TemplateCollection', templateModel);
    }

    /**
     * Returns a set of templates from the SDK.
     */
    public async GetTemplates(): Promise<TemplateModel[]> {
        return await this.extensionDataManager.getDocuments('TemplateCollection');
    }

    /**
     * Removes all templates from the SDK.
     */
    public async ClearTemplates() {
        var documents = await this.extensionDataManager.getDocuments('TemplateCollection');
        documents.forEach(async (document: TemplateModel) => {
            await this.extensionDataManager.deleteDocument('TemplateCollection', document.id!);
        });
    }

    /**
     * Updates a model in the SDK.
     * @param templateModel - Model to update.
     */
    public async UpdateTemplate(templateModel:TemplateModel): Promise<void> {
        await this.extensionDataManager.updateDocument('TemplateCollection', templateModel);
    }

    /**
     * Deletes a model from the SDK.
     * @param id - ID to delete.
     */
    public async DeleteTemplate(id: string): Promise<void> {
        await this.extensionDataManager.deleteDocument('TemplateCollection', id);
    }
}