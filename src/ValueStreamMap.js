import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Step from './Step' // Assuming Step.js is in the same directory

function ValueStreamMap() {
  const [steps, setSteps] = useState([
    {
      id: 'step-0',
      data: { processTime: 0, waitTime: 0, pca: 0, title: 'Step 1' },
    },
  ])

  useEffect(() => {
    if (steps.length === 0) {
      addStep()
    }
  }, [steps])

  const addStep = () => {
    const newStep = {
      id: `step-${steps.length}`,
      data: {
        processTime: 0,
        waitTime: 0,
        pca: 0,
        title: `Step ${steps.length + 1}`,
      },
    }
    setSteps(prevSteps => [...prevSteps, newStep])
  }

  const updateStep = (stepNumber, field, value) => {
    setSteps(prevSteps =>
      prevSteps.map((step, index) =>
        index === stepNumber
          ? { ...step, data: { ...step.data, [field]: value } }
          : step
      )
    )
  }

  const onDragEnd = result => {
    if (!result.destination) return
    const items = Array.from(steps)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setSteps(items)
  }

  const calculateFlowEfficiency = () => {
    const totalProcessTime = steps.reduce(
      (acc, step) => acc + step.data.processTime,
      0
    )
    const totalWaitTime = steps.reduce(
      (acc, step) => acc + step.data.waitTime,
      0
    )
    return (totalProcessTime / (totalProcessTime + totalWaitTime)) * 100 || 0
  }

  return (
    <div>
      <div>
        <button onClick={addStep}>Create Step</button>
      </div>
      <div>Flow Efficiency: {calculateFlowEfficiency().toFixed(2)}%</div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                className="value-stream-map-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {steps.map((step, index) => (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Step
                          key={step.id}
                          stepNumber={index}
                          stepData={step.data}
                          updateStep={updateStep}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default ValueStreamMap
