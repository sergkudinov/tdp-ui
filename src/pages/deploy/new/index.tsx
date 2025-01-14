import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

type DeployModes = {
  [key: string]: DeployMode
}

type DeployMode = {
  title: string
  description: string
  href: string
}

const deployModes: DeployModes = {
  dag: {
    title: 'Deploy from the DAG',
    description: 'Launch operations batches in DAG order.',
    href: '/deploy/new/dag',
  },
  operations: {
    title: 'Deploy operations',
    description: 'Launch a list of operation in the desired order.',
    href: '/deploy/new/operations',
  },
  reconfigure: {
    title: 'Reconfigure',
    description:
      'Restart required services after configuration modification(s).',
    href: '/deploy/new/reconfigure',
  },
}

export default function DeployModeStep() {
  return (
    <>
      <div className="mt-2 mb-5 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-medium text-gray-900">New deployment</h1>
      </div>
      <div className="flex flex-col gap-3">
        {Object.keys(deployModes).map((v) => (
          <DeployOption
            key={v}
            description={deployModes[v].description}
            title={deployModes[v].title}
            href={deployModes[v].href}
          />
        ))}
      </div>
    </>
  )
}

function DeployOption({ title, description, href }: DeployMode) {
  return (
    <Link
      href={href}
      className="p-5 cursor-pointer text-gray-500 border border-gray-200 rounded-md hover:text-gray-600 hover:bg-gray-50 hover:border-gray-400"
      aria-label={title}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <p>{description}</p>
        </div>
        <ChevronRightIcon className="ml-3 h-6 w-6" aria-hidden="true" />
      </div>
    </Link>
  )
}
