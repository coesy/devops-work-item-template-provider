import { IExtensionContext } from "azure-devops-extension-sdk";
import { ISdkProxy } from "./iSdkProxy";
import * as SDK from 'azure-devops-extension-sdk/SDK';

/**
 * Proxy from `ISdkProxy` to Azure `SDK`.
 */
export class SdkProxy implements ISdkProxy {
    getExtensionContext(): IExtensionContext {
        return SDK.getExtensionContext();
    }
}