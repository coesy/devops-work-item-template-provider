describe('BLANK TEST', () => {
    test('AA', () => {});
});

//import { AzureDevopsExtensionApiDefaults/*, MockWorkItemTrackingRestClientProxy, WorkItemTrackingRestClientProxy_getWorkItem*/ } from '../proxies/mocks';
//
//
//
//jest.mock('azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient', () => {
//    return {
//        WorkItemTrackingRestClient: jest.fn().mockImplementation(() => {
//
//            function createWorkItemFunction(
//                document: WebApi.JsonPatchDocument, 
//                project: string, 
//                type: string, 
//                validateOnly?: boolean | undefined, 
//                bypassRules?: boolean | undefined, 
//                suppressNotifications?: boolean | undefined, 
//                expand?: WorkItemTracking.WorkItemExpand | undefined) : Promise<WorkItemTracking.WorkItem>
//            {
//                return new Promise(() => AzureDevopsExtensionApiDefaults.CreateWorkItemTrackingWorkItem());
//            }
//
//            function getWorkItemFunction(
//                id: number, 
//                project?: string | undefined, 
//                fields?: string[] | undefined, 
//                asOf?: Date | undefined, 
//                expand?: WorkItemTracking.WorkItemExpand | undefined) : Promise<WorkItemTracking.WorkItem>
//            {
//                return new Promise(() => AzureDevopsExtensionApiDefaults.CreateWorkItemTrackingWorkItem());
//            }
//
//            var mock = {} as any;
//            mock.getWorkItem = getWorkItemFunction;
//            return mock;
//        })
//    }
//});
//
//import { beforeEach, describe, expect, jest, test } from '@jest/globals';
//import { TemplatePartModelExistingType } from './templatePartModelExistingType';
//import { AzureHttpClient } from './azureHttpClient';
//
//import { getErrorAsync } from '../test';
//import { AzureHttpClientFields } from './azureHttpClientFields';
//import * as WebApi from 'azure-devops-extension-api/WebApi/WebApi';
//import * as WorkItemTracking from 'azure-devops-extension-api/WorkItemTracking/WorkItemTracking';
//import { WorkItemTrackingRestClient } from 'azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient';
//
//
//
////jest.mock('azure-devops-extension-api/WorkItemTracking/WorkItemTrackingClient', () => {
////    return {
////        WorkItemTrackingRestClient: jest.fn().mockImplementation(() => {
////            return {
////                createWorkItem: (document: WebApi.JsonPatchDocument, project: string, type: string, validateOnly?: boolean | undefined, bypassRules?: boolean | undefined, suppressNotifications?: boolean | undefined, expand?: WorkItemTracking.WorkItemExpand | undefined) =>{
////                    return AzureDevopsExtensionApiDefaults.CreateWorkItemTrackingWorkItem();
////                }
////            }
////        })
////    }
////});
//
//describe('Azure HTTP Client', () => {
//    //var mockedWorkItemTrackingRestClient = jest.mocked(WorkItemTrackingRestClient);
//    //var mockedWorkItemTrackingRestClient = new MockWorkItemTrackingRestClientProxy(
//    //var mockContainer = new MockWorkItemTrackingRestClient();
//    var mockedWorkItemTrackingRestClient = jest.mocked(WorkItemTrackingRestClient, {shallow: true});
//    //mockedWorkItemTrackingRestClient.
//
//    beforeEach(() => {
//        mockedWorkItemTrackingRestClient.mockClear();
//
////        WorkItemTrackingRestClientProxy_getWorkItem.mockClear();
////        WorkItemTrackingRestClientProxy_getWorkItem.mockReturnValue(AzureDevopsExtensionApiDefaults.CreateWorkItemTrackingWorkItem());
//    });
//
//    var azureHttpClient = new AzureHttpClient(
//        'unit test organisation',
//        'unit test project',
//        //mockedWorkItemTrackingRestClient
//        mockedWorkItemTrackingRestClient.getMockImplementation()! as unknown as WorkItemTrackingRestClient
//    );
//
//    test('CreateTask with no parent throws', async () => {
////        WorkItemTrackingRestClientProxy_getWorkItem.mockClear();
////        WorkItemTrackingRestClientProxy_getWorkItem.mockReturnValue(undefined);
//
//        var error = await getErrorAsync(async () => {
//            await azureHttpClient.CreateTask(1, {
//                id: '',
//                isExisting: false,
//                workItemNumber: -1,
//                title: '',
//                attributes: [],
//                description: '',
//                copyType: TemplatePartModelExistingType.NotApplicable
//            })});
//
//        expect(error?.message).toBe('Undefined parent, unable to create a task');
//    });
//
//    test('CreateTask sets title on target work item content', async () => {
//
//
//
//        await azureHttpClient.CreateTask(1, {
//            id: '',
//            isExisting: false,
//            workItemNumber: -1,
//            title: 'Unit test title',
//            attributes: [],
//            description: '',
//            copyType: TemplatePartModelExistingType.NotApplicable
//        });
//
//        //var createWorkItemInvocations = mockedWorkItemTrackingRestClient.getInvocationsT1<{op:String,path:String,value:String}[]>('createWorkItem');
//        //expect(createWorkItemInvocations).toHaveLength(1);
//        //expect(createWorkItemInvocations[0].firstArgument.filter(x => x.path === '/fields/System.Title')[0].value).toBe('Unit test title');
//    });
////
////    test('CreateTask sets AreaPath from parent', async () => {
//////        WorkItemTrackingRestClientProxy_getWorkItem.mockClear();
////        var responseItem = AzureDevopsExtensionApiDefaults.CreateWorkItemTrackingWorkItem();
////        responseItem.fields[AzureHttpClientFields.AreaPath] = 'Unit test area path';
//////        WorkItemTrackingRestClientProxy_getWorkItem.mockReturnValue(responseItem);
////
////        await azureHttpClient.CreateTask(1, {
////            id: '',
////            isExisting: false,
////            workItemNumber: -1,
////            title: 'Unit test title',
////            attributes: [],
////            description: '',
////            copyType: TemplatePartModelExistingType.NotApplicable
////        });
////
////        //var createWorkItemInvocations = mockedWorkItemTrackingRestClient.getInvocationsT1<{op:String,path:String,value:String}[]>('createWorkItem');
////        //expect(createWorkItemInvocations).toHaveLength(1);
////        //expect(createWorkItemInvocations[0].firstArgument.filter(x => x.path === '/fields/' + AzureHttpClientFields.AreaPath)[0].value).toBe('Unit test area path');
////    });
//
//    // More tests are required.
//});