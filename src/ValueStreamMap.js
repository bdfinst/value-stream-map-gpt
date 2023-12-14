import React, { useEffect, useState } from 'react'

import Step from './Step'

function ValueStreamMap() {
  const [steps, setSteps] = useState([
    { processTime: 0, waitTime: 0, pca: 0, title: '' },
  ])

  useEffect(() => {
    if (steps.length === 0) {
      addStep()
    }
  }, [steps])

  const addStep = () => {
    setSteps([...steps, { processTime: 0, waitTime: 0, pca: 0, title: '' }])
  }

  const updateStep = (index, field, value) => {
    const newSteps = [...steps]
    newSteps[index][field] = value
    setSteps(newSteps)
  }

  const calculateFlowEfficiency = () => {
    const totalProcessTime = steps.reduce(
      (acc, step) => acc + (step.processTime || 0),
      0
    )
    const totalWaitTime = steps.reduce(
      (acc, step) => acc + (step.waitTime || 0),
      0
    )
    return (totalProcessTime / (totalProcessTime + totalWaitTime)) * 100 || 0
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            stepNumber={index}
            stepData={step}
            updateStep={updateStep}
          />
        ))}
      </div>
      <button onClick={addStep}>Create Step</button>
      <div>
        Flow Efficiency:{' '}
        {steps.length ? calculateFlowEfficiency().toFixed(2) : 'N/A'}%
      </div>
    </div>
  )
}

export default ValueStreamMap