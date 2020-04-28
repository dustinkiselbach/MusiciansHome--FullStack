import React from 'react'
import classnames from 'classnames'

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <div
      className={classnames('form-group', {
        'is-invalid': error
      })}
    >
      <textarea
        className='form-input'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && <div className='error-msg'>{error}</div>}
    </div>
  )
}

export default TextAreaFieldGroup
