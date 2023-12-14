import './style.css'

import PropTypes from 'prop-types'
import React from 'react'

function StepInput({ className, type, value, onChange, placeholder }) {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

function Step({ stepNumber, stepData, updateStep }) {
  const handleChange = (field, value) => {
    updateStep(stepNumber, field, value)
  }

  const fields = [
    {
      field: 'title',
      type: 'text',
      placeholder: '',
      className: 'step-title',
      value: stepData.title || `Step ${stepNumber + 1}`,
    },
    {
      field: 'processTime',
      type: 'number',
      placeholder: 'Process Time',
      className: 'step-data',
      value: stepData.processTime,
    },
    {
      field: 'waitTime',
      type: 'number',
      placeholder: 'Wait Time',
      className: 'step-data',
      value: stepData.waitTime,
    },
    {
      field: 'pca',
      type: 'number',
      placeholder: '% Complete & Accurate',
      className: 'step-data',
      value: stepData.pca,
    },
  ]

  return (
    <div className="step">
      {fields.map(({ field, type, placeholder, className, value }) => (
        <StepInput
          key={field}
          className={className}
          type={type}
          value={value}
          onChange={e => handleChange(field, parseFloat(e.target.value))}
          placeholder={placeholder}
        />
      ))}
    </div>
  )
}

StepInput.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

Step.propTypes = {
  stepNumber: PropTypes.number.isRequired,
  stepData: PropTypes.shape({
    title: PropTypes.string,
    processTime: PropTypes.number,
    waitTime: PropTypes.number,
    pca: PropTypes.number,
  }).isRequired,
  updateStep: PropTypes.func.isRequired,
}

export default Step
