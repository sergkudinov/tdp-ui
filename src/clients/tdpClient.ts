import {
  ComponentsApi,
  DeployApi,
  OperationApi,
  PlanApi,
  SchemaApi,
  ServicesApi,
} from '@/client-sdk'
import type {
  ComponentUpdate,
  Configuration,
  DeployRequest,
  OperationsRequest,
  ResumeRequest,
  ServiceUpdate,
} from '@/client-sdk'

export type {
  Component,
  ComponentUpdate,
  DeploymentLog,
  DeploymentLogWithOperations,
  DeployRequest,
  FetchParams,
  Middleware,
  Operation,
  OperationLog,
  OperationsRequest,
  Service,
  ServiceUpdate,
} from '@/client-sdk'

export { FilterTypeEnum, Configuration } from '@/client-sdk'

export function createTdpClientInstance(configuration?: Configuration) {
  const serviceApi = new ServicesApi(configuration)
  const componentsApi = new ComponentsApi(configuration)
  const deployApi = new DeployApi(configuration)
  const operationApi = new OperationApi(configuration)
  const planApi = new PlanApi(configuration)
  const schemaApi = new SchemaApi(configuration)

  return {
    getServices: () => serviceApi.getServicesApiV1ServiceGet(),
    getService: (serviceId: string) =>
      serviceApi.getServiceApiV1ServiceServiceIdGet(serviceId),
    putService: (serviceId: string, serviceUpdate: ServiceUpdate) =>
      serviceApi.putServiceApiV1ServiceServiceIdPut(serviceId, serviceUpdate),
    patchService: (serviceId: string, serviceUpdate: ServiceUpdate) =>
      serviceApi.patchServiceApiV1ServiceServiceIdPatch(
        serviceId,
        serviceUpdate
      ),
    getComponent: (componentId: string, serviceId: string) =>
      componentsApi.getComponentApiV1ServiceServiceIdComponentComponentIdGet(
        componentId,
        serviceId
      ),
    putComponent: (
      componentId: string,
      serviceId: string,
      componentUpdate: ComponentUpdate
    ) =>
      componentsApi.putComponentApiV1ServiceServiceIdComponentComponentIdPut(
        componentId,
        serviceId,
        componentUpdate
      ),
    patchComponent: (
      componentId: string,
      serviceId: string,
      componentUpdate: ComponentUpdate
    ) =>
      componentsApi.patchComponentApiV1ServiceServiceIdComponentComponentIdPatch(
        componentId,
        serviceId,
        componentUpdate
      ),
    getDeploymentStatus: () => deployApi.deploymentStatusApiV1DeployStatusGet(),
    getDeployments: (limit?: number, offset?: number) =>
      deployApi.getDeploymentsApiV1DeployGet(limit, offset),
    getDeployment: (deploymentId: number) =>
      deployApi.getDeploymentApiV1DeployDeploymentIdGet(deploymentId),
    getDeploymentOperation: (deploymentId: number, operation: string) =>
      deployApi.getDeploymentOperationApiV1DeployDeploymentIdOperationOperationGet(
        deploymentId,
        operation
      ),
    dagDeploy: (deployRequest?: DeployRequest) =>
      deployApi.dagApiV1DeployDagPost(deployRequest),
    operationsDeploy: (operationsRequest: OperationsRequest) =>
      deployApi.operationsApiV1DeployOperationsPost(operationsRequest),
    reconfigureDeploy: () => deployApi.reconfigureApiV1DeployReconfigurePost(),
    resumeDeploy: (resumeRequest?: ResumeRequest) =>
      deployApi.resumeApiV1DeployResumePost(resumeRequest),
    getOperations: () => operationApi.getOperationsApiV1OperationGet(),
    getDagOperations: () => operationApi.getDagOperationsApiV1OperationDagGet(),
    getOtherOperations: () =>
      operationApi.getOtherOperationsApiV1OperationOtherGet(),
    planDeployDag: (deployRequest?: DeployRequest) =>
      planApi.dagApiV1PlanDagPost(deployRequest),
    planDeployOperations: (operationsRequest: OperationsRequest) =>
      planApi.operationsApiV1PlanOperationsPost(operationsRequest),
    planDeployReconfigure: () => planApi.reconfigureApiV1PlanReconfigurePost(),
    planDeployResume: (resumeRequest?: ResumeRequest) =>
      planApi.resumeApiV1PlanResumePost(resumeRequest),
    getSchemas: () => schemaApi.getSchemasApiV1SchemaGet(),
    getSchema: (serviceId: string) =>
      schemaApi.getSchemaApiV1SchemaServiceIdGet(serviceId),
  }
}

export type TdpClient = ReturnType<typeof createTdpClientInstance>
