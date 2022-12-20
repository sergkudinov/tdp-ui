import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Button } from 'src/components/commons'
import { useDeployContext } from 'src/contexts'
import { DeployMethodsEnum } from 'src/types/deployTypes'
import {
  RestartField,
  FilterField,
  OperationsField,
  OperationsReorderField,
} from './Fields'
import { FormDisplay } from './FormDisplay'

type DeployModes = {
  [key in DeployMethodsEnum]: {
    title: string
    fieldList: any[]
  }
}

const deployModes: DeployModes = {
  [DeployMethodsEnum.ALL]: {
    title: 'Deploy All',
    fieldList: [],
  },
  [DeployMethodsEnum.SOURCES]: {
    title: 'Deploy From Sources',
    fieldList: [OperationsField, FilterField, RestartField],
  },
  [DeployMethodsEnum.TARGETS]: {
    title: 'Deploy To Targets',
    fieldList: [OperationsField, FilterField, RestartField],
  },
  [DeployMethodsEnum.CUSTOM]: {
    title: 'Custom Deploy',
    fieldList: [OperationsReorderField],
  },
}

export function ConfigurationStep({ togglePreviousStep, toggleNextStep }) {
  const {
    state: { selectedDeployMode, operations },
  } = useDeployContext()
  const { title, fieldList } = deployModes[selectedDeployMode]
  const isDisabled =
    !operations.length && selectedDeployMode !== DeployMethodsEnum.ALL

  function handleOnClickNext() {
    if (isDisabled) return
    toggleNextStep()
  }

  return (
    <>
      <FormDisplay title={title} fieldsList={fieldList} />
      <div className="flex justify-between mt-6">
        <Button
          onClick={togglePreviousStep}
          variant="outlined"
          className="flex items-center gap-1"
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span>Deploy Mode</span>
        </Button>
        <Button
          onClick={handleOnClickNext}
          variant="outlined"
          disabled={isDisabled}
          className="flex items-center gap-1"
        >
          <span>Review</span>
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>
    </>
  )
}
