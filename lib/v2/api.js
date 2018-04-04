/*
Note: This file will generate the aliases for the /api/ paths
The aliases do not retain all the information that make the interface RESTful,
but are meant to be readable and easy-to-use
 */

module.exports = [
    ['postAccount', 'POST', 'Account'],
    ['postLogs', 'POST', 'logs'],
    ['postSubmitLogs', 'POST', 'Logs/SubmitLogs'],
    ['postSubmitHeartbeat', 'POST', 'RobotsService/SubmitHeartbeat'],
    ['postSubmitJobState', 'POST', 'RobotsService/SubmitJobState'],
    ['getRobotMapping', 'GET', 'RobotsService/GetRobotMappings'],
    ['getConnectionData', 'GET', 'RobotsService/GetConnectionData'],
    ['postAcquireLicense', 'POST', 'RobotsService/AcquireLicense'],
    ['postReleaseLicense', 'POST', 'RobotsService/ReleaseLicense'],
    ['getRobotsService', 'GET', 'RobotsService'],
    ['getCountState', 'GET', 'Stats/GetCountStats'],
    ['getSessionStats', 'GET', 'Stats/GetSessionsStats'],
    ['getJobsStats', 'GET', 'Stats/GetJobsStats'],
    ['getStatus', 'GET', 'Status']
];

// TODO better JSDocument queries

/**
 * @name postAccount
 * @memberOf V2RestGroup.api
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postLogs
 * @memberOf V2RestGroup.api
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postSubmitLogs
 * @memberOf V2RestGroup.api
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postSubmitHeartbeat
 * @memberOf V2RestGroup.api
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postSubmitJobState
 * @memberOf V2RestGroup.api
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postAcquireLicense
 * @memberOf V2RestGroup.api
 * @type {OrchestratorPostHelper}
 */

/**
 * @name postReleaseLicense
 * @memberOf V2RestGroup.api
 * @type {OrchestratorPostHelper}
 */

/**
 * @name getRobotMapping
 * @memberOf V2RestGroup.api
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getConnectionData
 * @memberOf V2RestGroup.api
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getRobotsService
 * @memberOf V2RestGroup.api
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getCountState
 * @memberOf V2RestGroup.api
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getSessionStats
 * @memberOf V2RestGroup.api
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getJobsStats
 * @memberOf V2RestGroup.api
 * @type {OrchestratorGetHelper}
 */

/**
 * @name getStatus
 * @memberOf V2RestGroup.api
 * @type {OrchestratorGetHelper}
 */
