import React from 'react'

function Step({ stepNumber, stepData, updateStep }) {
  const handleInputChange = (field, value) => {
    updateStep(stepNumber, field, value)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
        border: '1px solid black',
        padding: '10px',
      }}
    >
      <input
        type="text"
        value={stepData.title || `Step ${stepNumber + 1}`}
        onChange={e => handleInputChange('title', e.target.value)}
        placeholder={`Step ${stepNumber + 1}`}
      />
      <input
        type="number"
        value={stepData.processTime}
        onChange={e =>
          handleInputChange('processTime', parseFloat(e.target.value))
        }
        placeholder="Process Time"
      />
      <input
        type="number"
        value={stepData.waitTime}
        onChange={e =>
          handleInputChange('waitTime', parseFloat(e.target.value))
        }
        placeholder="Wait Time"
      />
      <input
        type="number"
        value={stepData.pca}
        onChange={e => handleInputChange('pca', parseFloat(e.target.value))}
        placeholder="% Complete & Accurate"
      />
    </div>
  )
}

export default Step
