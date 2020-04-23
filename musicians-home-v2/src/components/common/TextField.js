import React from 'react'
import classnames from 'classnames'
import propTypes from 'prop-types'

const TextFieldGroup = ({
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
  // Conditional to check for errors or no errors
  let errorDiv = ''

  if (error) {
    const filtered = error.filter(err => err.param === `${name}`)

    if (filtered.length === 0) {
    } else {
      errorDiv = <div className='error-msg'>* {filtered[0].msg}</div>
    }
  }

  return (
    <div
      className={classnames('form-group', {
        'is-invalid': errorDiv
      })}
    >
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        className='form-input'
        onChange={onChange}
        disabled={disabled}
      />
      {errorDiv}
    </div>
  )
}

// TextFieldGroup.propTypes = {
//   name: propTypes.string.isRequired,
//   placeholder: propTypes.string,
//   info: propTypes.string,
//   error: propTypes.string,
//   type: propTypes.string,
//   onChange: propTypes.func.isRequired,
//   disabled: propTypes.string
// }

// TextFieldGroup.defaultProps = {
//   type: 'text'
// }

export default TextFieldGroup
