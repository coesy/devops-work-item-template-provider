import * as SDK from 'azure-devops-extension-sdk/SDK';

/**
 * A proxy for the Azure SDK.
 */
export interface ISdkProxy {
    /**
     * A proxy for the SDK.getExtensionContext method.
     */
    getExtensionContext(): SDK.IExtensionContext;
}