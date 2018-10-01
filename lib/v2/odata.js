/*
Note: Not all APIs here are generic, so we will split what can be generated from what cannot
 */

'use strict';

// native
var util = require('util');

module.exports.generic = [
    ['getAlerts', 'GET', 'Alerts'],
    ['getUnreadAlertCount', 'GET', 'Alerts/UiPath.Server.Configuration.OData.GetUnreadCount()'],
    ['postMarkAlertAsRead', 'POST', 'Alerts/UiPath.Server.Configuration.OData.MarkAsRead'],
    ['postRaiseProcessAlert', 'POST', 'Alerts/UiPath.Server.Configuration.OData.RaiseProcessAlert'],
    ['getAssets', 'GET', 'Assets'],
    ['getAuditLogs', 'GET', 'AuditLogs'],
    ['getAuditReports', 'GET', 'AuditLogs/UiPath.Server.Configuration.OData.Reports()'],
    ['getEnvironments', 'GET', 'Environments'],
    ['getJobs', 'GET', 'Jobs'],
    ['postStartJobs', 'POST', 'Jobs/UiPath.Server.Configuration.OData.StartJobs'],
    ['getPermissions', 'GET', 'Permissions'],
    ['getProcesses', 'GET', 'Processes'],
    ['postUploadPackage', 'POST', 'Processes/UiPath.Server.Configuration.OData.UploadPackage'],
    ['getProcessSchedules', 'GET', 'ProcessSchedules'],
    ['postSetProcessScheduleEnabled', 'POST', 'ProcessSchedules/UiPath.Server.Configuration.OData.SetEnabled'],
    ['getQueueDefinitions', 'GET', 'QueueDefinitions'],
    ['getQueueItemComments', 'GET', 'QueueItemComments'],
    ['getQueueItemEvents', 'GET', 'QueueItemEvents'],
    ['getQueueItems', 'GET', 'QueueItems'],
    ['postSetQueueItemReviewStatus', 'POST', 'QueueItems/UiPathODataSvc.SetItemReviewStatus'],
    ['postDeleteBulkQueueItems', 'POST', 'QueueItems/UiPathODataSvc.DeleteBulk'],
    ['postSetQueueItemReviewer', 'POST', 'QueueItems/UiPathODataSvc.SetItemReviewer'],
    ['postUnsetQueueItemReviewer', 'POST', 'QueueItems/UiPathODataSvc.UnsetItemReviewer'],
    ['getQueueItemsReviewers', 'GET', 'QueueItems/UiPath.Server.Configuration.OData.GetReviewers()'],
    ['getQueueProcessingRecords', 'GET', 'QueueProcessingRecords'],
    ['getRetrieveQueuesProcessingStatus', 'GET', 'QueueProcessingRecords/UiPathODataSvc.RetrieveQueuesProcessingStatus()'],
    ['getQueues', 'GET', 'Queues'],
    ['postStartTransaction', 'POST', 'Queues/UiPathODataSvc.StartTransaction'],
    ['postAddQueueItem', 'POST', 'Queues/UiPathODataSvc.AddQueueItem'],
    ['getReleases', 'GET', 'Releases'],
    ['getRobotLogs', 'GET', 'RobotLogs'],
    ['getRobotLogsReports', 'GET', 'RobotLogs/UiPath.Server.Configuration.OData.Reports()'],
    ['getRobots', 'GET', 'Robots'],
    ['getMachineNameToLicenseKeyMappings', 'GET', 'Robots/UiPath.Server.Configuration.OData.GetMachineNameToLicenseKeyMappings()'],
    ['getRoles', 'GET', 'Roles'],
    ['getSessions', 'GET', 'Sessions'],
    ['getSettings', 'GET', 'Settings'],
    ['getServicesSettings', 'GET', 'Settings/UiPath.Server.Configuration.OData.GetServicesSettings()'],
    ['getWebSettings', 'GET', 'Settings/UiPath.Server.Configuration.OData.GetWebSettings()'],
    ['getAuthenticationSettings', 'GET', 'Settings/UiPath.Server.Configuration.OData.GetAuthenticationSettings()'],
    ['getConnectionString', 'GET', 'Settings/UiPath.Server.Configuration.OData.GetConnectionString()'],
    ['getLicense', 'GET', 'Settings/UiPath.Server.Configuration.OData.GetLicense()'],
    ['postUploadLicense', 'POST', 'Settings/UiPath.Server.Configuration.OData.UploadLicense'],
    ['getTimezones', 'GET', 'Settings/UiPath.Server.Configuration.OData.GetTimezones()'],
    ['postUpdateBulkSettings', 'POST', 'Settings/UiPath.Server.Configuration.OData.UpdateBulk'],
    ['getTenants', 'GET', 'Tenants'],
    ['postTenant', 'POST', 'Tenants'],
    ['postSetActiveTenant', 'POST', 'Tenants/UiPath.Server.Configuration.OData.SetActive'],
    ['getUsers', 'GET', 'Users'],
    ['getCurrentUserPermissions', 'GET', 'Users/UiPath.Server.Configuration.OData.GetCurrentPermissions()'],
    ['getCurrentUser', 'GET', 'Users/UiPath.Server.Configuration.OData.GetCurrentUser()'],
    ['postImportUsers', 'POST', 'Users/UiPath.Server.Configuration.OData.ImportUsers']
];

var format = util.format;
var custom = {};
module.exports.custom = custom;

/**
 * @name putAsset
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putAsset = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(format('/odata/Assets(%i)', id), data, callback);
    };
};

/**
 * @name deleteAsset
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteAsset = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(format('/odata/Assets(%i)', id), callback);
    };
};

/**
 * @name getRobotAsset
 * @memberOf V2RestGroup.odata
 * @type {function(robotId: string, assetName: string, query: Object, OrchestratorRestHelperCallback)}
 * @description Note: what is described as the robotId is in fact the robotKey that can be obtained from GetRobotMappings
 */

/** @param {Orchestrator} orchestrator */
custom.getRobotAsset = function (orchestrator) {
    return function (robotId, assetName, query, callback) {
        orchestrator.get(
            format(
                '/odata/Assets/UiPath.Server.Configuration.OData.GetRobotAsset(robotId=\'%s\',assetName=\'%s\')',
                robotId,
                assetName
            ),
            query,
            callback
        );
    };
};

/**
 * @name getAuditLogDetails
 * @memberOf V2RestGroup.odata
 * @type {function(auditLogId: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getAuditLogDetails = function (orchestrator) {
    return function (auditLogId, query, callback) {
        orchestrator.get(
            format(
                '/odata/AuditLogs/UiPath.Server.Configuration.OData.GetAuditLogDetails(auditLogId=%i)',
                auditLogId
            ),
            query,
            callback
        );
    };
};

/**
 * @name getEnvironment
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getEnvironment = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/Environments(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name putEnvironment
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putEnvironment = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/Environments(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteEnvironment
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteEnvironment = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/Environments(%i)', id),
            callback
        );
    };
};

/**
 * @name getRobotsForEnvironment
 * @memberOf V2RestGroup.odata
 * @type {function(key: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getRobotsForEnvironment = function (orchestrator) {
    return function (key, query, callback) {
        orchestrator.get(
            format('/odata/Environments/UiPath.Server.Configuration.OData.GetRobotsForEnvironment(key=%i)', key),
            query,
            callback
        );
    };
};

/**
 * @name getRobotIdsForEnvironment
 * @memberOf V2RestGroup.odata
 * @type {function(key: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getRobotIdsForEnvironment = function (orchestrator) {
    return function (key, query, callback) {
        orchestrator.get(
            format('/odata/Environments/UiPath.Server.Configuration.OData.GetRobotIdsForEnvironment(key=%i)', key),
            query,
            callback
        );
    };
};

/**
 * @name postEnvironmentAddRobot
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postEnvironmentAddRobot = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Environments(%i)/UiPath.Server.Configuration.OData.AddRobot', id),
            data,
            callback
        );
    };
};

/**
 * @name postEnvironmentRemoveRobot
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postEnvironmentRemoveRobot = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Environments(%i)/UiPath.Server.Configuration.OData.RemoveRobot', id),
            data,
            callback
        );
    };
};

/**
 * @name postEnvironmentSetRobots
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postEnvironmentSetRobots = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Environments(%i)/UiPath.Server.Configuration.OData.SetRobots', id),
            data,
            callback
        );
    };
};

/**
 * @name getJob
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getJob = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/Jobs(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name putJob
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putJob = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/Jobs(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name postStopJob
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postStopJob = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Jobs(%i)/UiPath.Server.Configuration.OData.StopJob', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteProcess
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteProcess = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/Processes(\'%i\')', id),
            callback
        );
    };
};

/**
 * @name getProcessVersions
 * @memberOf V2RestGroup.odata
 * @type {function(processId: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getProcessVersions = function (orchestrator) {
    return function (processId, query, callback) {
        orchestrator.get(
            format('/odata/Processes/UiPath.Server.Configuration.OData.GetProcessVersions(processId=\'%i\')', processId),
            query,
            callback
        );
    };
};

/**
 * @name getProcessSchedule
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getProcessSchedule = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/ProcessSchedules(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name putProcessSchedule
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putProcessSchedule = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/ProcessSchedules(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteProcessSchedule
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteProcessSchedule = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/ProcessSchedules(%i)', id),
            callback
        );
    };
};

/**
 * @name getRobotIdsForSchedule
 * @memberOf V2RestGroup.odata
 * @type {function(key: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getRobotIdsForSchedule = function (orchestrator) {
    return function (key, query, callback) {
        orchestrator.get(
            format('/odata/ProcessSchedules/UiPath.Server.Configuration.OData.GetRobotIdsForSchedule(key=%i)', key),
            query,
            callback
        );
    };
};

/**
 * @name getQueueDefinition
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getQueueDefinition = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/QueueDefinitions(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name putQueueDefinition
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putQueueDefinition = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/QueueDefinitions(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteQueueDefinition
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteQueueDefinition = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/QueueDefinitions(%i)', id),
            callback
        );
    };
};

/**
 * @name getQueueDefinitionReports
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getQueueDefinitionReports = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/QueueDefinitions(%i)/UiPathODataSvc.Reports()', id),
            query,
            callback
        );
    };
};

/**
 * @name getQueueItemComment
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getQueueItemComment = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/QueueItemComments(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name putQueueItemComment
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putQueueItemComment = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/QueueItemComments(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteQueueItemComment
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteQueueItemComment = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/QueueItemComments(%i)', id),
            callback
        );
    };
};

/**
 * @name getQueueItemCommentsHistory
 * @memberOf V2RestGroup.odata
 * @type {function(queueItemId: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getQueueItemCommentsHistory = function (orchestrator) {
    return function (queueItemId, query, callback) {
        orchestrator.get(
            format(
                '/odata/QueueItemComments/UiPath.Server.Configuration.OData.GetQueueItemCommentsHistory(queueItemId=%i)',
                queueItemId
            ),
            query,
            callback
        );
    };
};

/**
 * @name getQueueItemEvent
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getQueueItemEvent = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/QueueItemEvents(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name getQueueItemEventsHistory
 * @memberOf V2RestGroup.odata
 * @type {function(queueItemId: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getQueueItemEventsHistory = function (orchestrator) {
    return function (queueItemId, query, callback) {
        orchestrator.get(
            format(
                '/odata/QueueItemEvents/UiPath.Server.Configuration.OData.GetQueueItemEventsHistory(queueItemId=%i)',
                queueItemId
            ),
            query,
            callback
        );
    };
};

/**
 * @name getQueueItem
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getQueueItem = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/QueueItems(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name putQueueItem
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putQueueItem = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/QueueItems(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteQueueItem
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteQueueItem = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/QueueItems(%i)', id),
            callback
        );
    };
};

/**
 * @name patchQueueItem
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.patchQueueItem = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.patch(
            format('/odata/QueueItems(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name getItemProcessingHistory
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getItemProcessingHistory = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/QueueItems(%i)/UiPathODataSvc.GetItemProcessingHistory()', id),
            query,
            callback
        );
    };
};

/**
 * @name postSetTransactionProgress
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postSetTransactionProgress = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/QueueItems(%i)/UiPathODataSvc.SetTransactionProgress', id),
            data,
            callback
        );
    };
};

/**
 * @name getQueueProcessingRecord
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getQueueProcessingRecord = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/QueueProcessingRecords(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name deleteQueueProcessingRecord
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteQueueProcessingRecord = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/QueueProcessingRecords(%i)', id),
            callback
        );
    };
};

/**
 * @name getLastDaysProcessingRecords
 * @memberOf V2RestGroup.odata
 * @type {function(queueDefinitionId: number, daysNo: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getLastDaysProcessingRecords = function (orchestrator) {
    return function (queueDefinitionId, daysNo, query, callback) {
        orchestrator.get(
            format(
                '/odata/QueueProcessingRecords/UiPathODataSvc.RetrieveLastDaysProcessingRecords(daysNo=%i,queueDefinitionId=%i)',
                daysNo,
                queueDefinitionId
            ),
            query,
            callback
        );
    };
};

/**
 * @name getQueue
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getQueue = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/Queues(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name postSetTransactionResult
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postSetTransactionResult = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Queues(%i)/UiPathODataSvc.SetTransactionResult', id),
            data,
            callback
        );
    };
};

/**
 * @name getRelease
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getRelease = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/Releases(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name putRelease
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putRelease = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/Releases(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteRelease
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteRelease = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/Releases(%i)', id),
            callback
        );
    };
};

/**
 * @name postUpdateReleaseToSpecificPackageVersion
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postUpdateReleaseToSpecificPackageVersion = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Releases(%i)/UiPath.Server.Configuration.OData.UpdateToSpecificPackageVersion', id),
            data,
            callback
        );
    };
};

/**
 * @name postUpdateReleaseToLatestPackageVersion
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postUpdateReleaseToLatestPackageVersion = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Releases(%i)/UiPath.Server.Configuration.OData.UpdateToLatestPackageVersion', id),
            data,
            callback
        );
    };
};

/**
 * @name postRollbackToPreviousReleaseVersion
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postRollbackToPreviousReleaseVersion = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Releases(%i)/UiPath.Server.Configuration.OData.RollbackToPreviousReleaseVersion', id),
            data,
            callback
        );
    };
};

/**
 * @name getRobot
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getRobot = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/Robots(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name putRobot
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putRobot = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/Robots(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteRobot
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteRobot = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/Robots(%i)', id),
            callback
        );
    };
};

/**
 * @name putRole
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putRole = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/Roles(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteRole
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteRole = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/Roles(%i)', id),
            callback
        );
    };
};

/**
 * @name getUsersForRole
 * @memberOf V2RestGroup.odata
 * @type {function(key: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getUsersForRole = function (orchestrator) {
    return function (key, query, callback) {
        orchestrator.get(
            format('/odata/Roles/UiPath.Server.Configuration.OData.GetUsersForRole(key=%i)', key),
            query,
            callback
        );
    };
};

/**
 * @name getUserIdsForRole
 * @memberOf V2RestGroup.odata
 * @type {function(key: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getUserIdsForRole = function (orchestrator) {
    return function (key, query, callback) {
        orchestrator.get(
            format('/odata/Roles/UiPath.Server.Configuration.OData.GetUserIdsForRole(key=%i)', key),
            query,
            callback
        );
    };
};

/**
 * @name postSetRoleUsers
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postSetRoleUsers = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Roles(%i)/UiPath.Server.Configuration.OData.SetUsers', id),
            data,
            callback
        );
    };
};

/**
 * @name getSetting
 * @memberOf V2RestGroup.odata
 * @type {function(idOrKey: number|string, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getSetting = function (orchestrator) {
    return function (idOrKey, query, callback) {
        orchestrator.get(
            format('/odata/Settings(%s)', idOrKey),
            query,
            callback
        );
    };
};

/**
 * @name putSetting
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putSetting = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/Settings(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name getExecutionSettingsConfiguration
 * @description Scope of the configuration can be 0 for Global, 1 for Robot
 * @memberOf V2RestGroup.odata
 * @type {function(scope: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getExecutionSettingsConfiguration = function (orchestrator) {
    return function (scope, query, callback) {
        orchestrator.get(
            format('/odata/Settings/UiPath.Server.Configuration.OData.GetExecutionSettingsConfiguration(scope=%i)', scope),
            query,
            callback
        );
    };
};

/**
 * @name getTenant
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getTenant = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/Tenants(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name putTenant
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putTenant = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/Tenants(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteTenant
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteTenant = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/Tenants(%i)', id),
            callback
        );
    };
};

/**
 * @name getUserLoginAttempts
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getUserLoginAttempts = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/UserLoginAttempts(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name getUser
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, query: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.getUser = function (orchestrator) {
    return function (id, query, callback) {
        orchestrator.get(
            format('/odata/Users(%i)', id),
            query,
            callback
        );
    };
};

/**
 * @name putUser
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.putUser = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.put(
            format('/odata/Users(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name deleteUser
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.deleteUser = function (orchestrator) {
    return function (id, callback) {
        orchestrator.delete(
            format('/odata/Users(%i)', id),
            callback
        );
    };
};

/**
 * @name patchUser
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.patchUser = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.patch(
            format('/odata/Users(%i)', id),
            data,
            callback
        );
    };
};

/**
 * @name postToggleUserRole
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postToggleUserRole = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Users(%i)/UiPath.Server.Configuration.OData.ToggleRole', id),
            data,
            callback
        );
    };
};

/**
 * @name postChangeUserPassword
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postChangeUserPassword = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Users(%i)/UiPath.Server.Configuration.OData.ChangePassword', id),
            data,
            callback
        );
    };
};

/**
 * @name postSetUserActive
 * @memberOf V2RestGroup.odata
 * @type {function(id: number, data: Object, OrchestratorRestHelperCallback)}
 */

/** @param {Orchestrator} orchestrator */
custom.postSetUserActive = function (orchestrator) {
    return function (id, data, callback) {
        orchestrator.post(
            format('/odata/Users(%i)/UiPath.Server.Configuration.OData.SetActive', id),
            data,
            callback
        );
    };
};

/**
 * @name postMarkAlertAsRead
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postRaiseProcessAlert
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postStartJobs
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postUploadPackage
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postSetProcessScheduleEnabled
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postSetQueueItemReviewStatus
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postDeleteBulkQueueItems
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postSetQueueItemReviewer
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postUnsetQueueItemReviewer
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postStartTransaction
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postAddQueueItem
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postUploadLicense
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postUpdateBulkSettings
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postTenant
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postSetActiveTenant
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postImportUsers
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorPostHelper}
 */

/**
 * @name getAlerts
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getUnreadAlertCount
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getAssets
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getAuditLogs
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getAuditReports
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getEnvironments
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getJobs
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getPermissions
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getProcesses
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getProcessSchedules
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getQueueDefinitions
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getQueueItemComments
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getQueueItemEvents
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getQueueItems
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getQueueItemsReviewers
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getQueueProcessingRecords
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getRetrieveQueuesProcessingStatus
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getQueues
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getReleases
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getRobotLogs
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getRobotLogsReports
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getRobots
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getMachineNameToLicenseKeyMappings
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getRoles
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getSessions
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getSettings
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getServicesSettings
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getWebSettings
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getAuthenticationSettings
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getConnectionString
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getLicense
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getTimezones
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getTenants
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getUsers
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getCurrentUserPermissions
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getCurrentUser
 * @memberOf V2RestGroup.odata
 * @type {OrchestratorGetHelper}
 */
