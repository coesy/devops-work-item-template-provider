import { WorkItemCommentVersionRef } from "azure-devops-extension-api/WorkItemTracking/WorkItemTracking";
import * as WorkItemTracking from 'azure-devops-extension-api/WorkItemTracking/WorkItemTracking';

/**
 * A module which provides default azure objects, for use in testing.
 */
export module AzureDevopsExtensionApiDefaults {
    /**
     * Creates and returns a new WorkItemCommentVersionRef instance.
     */
    export function CreateWorkItemCommentVersionRef(): WorkItemCommentVersionRef {
        return {
            commentId: -1,
            createdInRevision: -1,
            isDeleted: false,
            text: '',
            version: 1,
            url: ''
        };
    }

    /**
     * Creates and returns a new WorkItemTracking.WorkItem instance.
     */
    export function CreateWorkItemTrackingWorkItem(): WorkItemTracking.WorkItem {
        return {
            commentVersionRef: CreateWorkItemCommentVersionRef(),
            fields: {},
            id: -1,
            relations: [],
            rev: 1,
            url: '',
            _links: []
        };
    }
}