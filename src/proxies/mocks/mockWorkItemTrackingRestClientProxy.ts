//import * as WebApi from 'azure-devops-extension-api/WebApi/WebApi';
//import * as WorkItemTracking from 'azure-devops-extension-api/WorkItemTracking/WorkItemTracking';
//import { IWorkItemTrackingRestClientProxy } from '..';
//import { jest } from '@jest/globals';
//import { AzureDevopsExtensionApiDefaults } from './azureDevopsExtensionApiDefaults';
//import { IMock, InvocationTracker } from '.';
//
///**
// * Jest callback function for MockWorkItemTrackingRestClientProxy.createWorkItem.
// */
//export const WorkItemTrackingRestClientProxy_createWorkItem = jest.fn().mockReturnValue(AzureDevopsExtensionApiDefaults.CreateWorkItemTrackingWorkItem());
///**
// * Jest callback function for MockWorkItemTrackingRestClientProxy.getWorkItem.
// */
//export const WorkItemTrackingRestClientProxy_getWorkItem = jest.fn().mockReturnValue(AzureDevopsExtensionApiDefaults.CreateWorkItemTrackingWorkItem());
///**
// * Jest callback function for MockWorkItemTrackingRestClientProxy.updateWorkItem.
// */
//export const WorkItemTrackingRestClientProxy_updateWorkItem = jest.fn().mockReturnValue(AzureDevopsExtensionApiDefaults.CreateWorkItemTrackingWorkItem());
//
///**
// * An implementation of IWorkItemTrackingRestClientProxy which can be used from unit tests.
// */
//export class MockWorkItemTrackingRestClientProxy extends InvocationTracker implements IWorkItemTrackingRestClientProxy, IMock {
//    createWorkItem(document: WebApi.JsonPatchDocument, project: string, type: string, validateOnly?: boolean | undefined, bypassRules?: boolean | undefined, suppressNotifications?: boolean | undefined, expand?: WorkItemTracking.WorkItemExpand | undefined): Promise<WorkItemTracking.WorkItem> {
//        this.addInvocation('createWorkItem', [document, project, type, validateOnly, bypassRules, suppressNotifications, expand]);
//        return Promise.resolve(WorkItemTrackingRestClientProxy_createWorkItem() as any);
//    }
//
//    getWorkItem(id: number, project?: string | undefined, fields?: string[] | undefined, asOf?: Date | undefined, expand?: WorkItemTracking.WorkItemExpand | undefined): Promise<WorkItemTracking.WorkItem> {
//        this.addInvocation('getWorkItem', [id, project, fields, asOf, expand]);
//        return Promise.resolve(WorkItemTrackingRestClientProxy_getWorkItem() as any);
//    }
//    
//    updateWorkItem(document: WebApi.JsonPatchDocument, id: number, project?: string | undefined, validateOnly?: boolean | undefined, bypassRules?: boolean | undefined, suppressNotifications?: boolean | undefined, expand?: WorkItemTracking.WorkItemExpand | undefined): Promise<WorkItemTracking.WorkItem> {
//        this.addInvocation('updateWorkItem', [document, id, project, validateOnly, bypassRules, suppressNotifications, expand]);
//        return Promise.resolve(WorkItemTrackingRestClientProxy_updateWorkItem() as any);
//    }
//}
