import { usePastDeploymentsRichList } from 'src/hooks'
import { DeployLogs } from 'src/components/Deploy'
import { Button } from 'src/components/commons'

export default function PastDeployLogsPage() {
  const pastDeploymentsRichList = usePastDeploymentsRichList()

  return (
    <>
      <div className="mt-2 mb-5 border-b border-gray-200 pb-5">
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium text-gray-900">Deployments</h1>
          <Button
            as="Link"
            href="/deploy/new/"
            variant="filled"
            className="mt-2"
          >
            New deployment
          </Button>
        </div>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the past deployed logs including their id deploy, start
          deploy, end deploy and state.
        </p>
      </div>
      {pastDeploymentsRichList.length === 0 ? (
        <div className="mt-2 text-center text-sm text-gray-700">
          - No past deployments to show -
        </div>
      ) : (
        <DeployLogs deployTab={pastDeploymentsRichList} />
      )}
    </>
  )
}
