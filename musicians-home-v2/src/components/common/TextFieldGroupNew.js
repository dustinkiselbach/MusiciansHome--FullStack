import React from 'react'
import classnames from 'classnames'

const TextFieldGroupNew = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div
      className={classnames('form-group', {
        'is-invalid': error
      })}
    >
      <input
        type={type}
        className='form-input'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && <div className='error-msg'>* {error}</div>}
    </div>
  )
}

TextFieldGroupNew.defaultProps = {
  type: 'text'
}

export default TextFieldGroupNew
