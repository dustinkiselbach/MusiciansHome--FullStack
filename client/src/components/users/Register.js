import React, { useState, useContext } from 'react'
import UsersContext from '../../context/users/usersContext'
import TextFieldGroupNew from '../common/TextFieldGroupNew'

const Register = props => {
  const usersContext = useContext(UsersContext)

  const { registerUser, errors } = usersContext

  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  // const [errors, setErrors] = useState({})

  const onChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()

    const newUser = {
      name: fields.name,
      email: fields.email,
      password: fields.password,
      password2: fields.password2
    }

    registerUser(newUser, props.history)
  }

  return (
    <div className='user-form-all'>
      <div className='overlay'>
        <div className='container'>
          <section className='user-form'>
            <form onSubmit={onSubmit}>
              <h2 className='user-form__title title'>Register</h2>
              <div className='user-form__form-area'>
                <TextFieldGroupNew
                  name='name'
                  type='text'
                  onChange={onChange}
                  placeholder='Name'
                  error={errors.name}
                />
                <TextFieldGroupNew
                  name='email'
                  type='email'
                  onChange={onChange}
                  placeholder='Email'
                  error={errors.email}
                />
                <TextFieldGroupNew
                  name='password'
                  type='password'
                  onChange={onChange}
                  placeholder='Password'
                  error={errors.password}
                />
                <TextFieldGroupNew
                  name='password2'
                  type='password'
                  onChange={onChange}
                  placeholder='Confirm Password'
                  error={errors.password2}
                />
                <button className='btn'>Register</button>
              </div>
            </form>
            <div className='listing-form__img'></div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Register
