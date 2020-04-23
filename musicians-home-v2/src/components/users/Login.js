import React, { useState, useContext, useEffect } from 'react'
import UsersContext from '../../context/users/usersContext'
import TextFieldGroupNew from '../common/TextFieldGroupNew'

const Login = props => {
  const usersContext = useContext(UsersContext)

  const { loginUser, isAuthenticated, errors } = usersContext

  const [fields, setFields] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, [isAuthenticated])

  const onChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()

    const user = {
      email: fields.email,
      password: fields.password
    }

    loginUser(user)
  }
  return (
    <div className='user-form-all'>
      <div className='overlay'>
        <div className='container'>
          <section className='user-form'>
            <form onSubmit={onSubmit}>
              <h2 className='user-form__title title'>Login</h2>
              <div className='user-form__form-area'>
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

                <button className='btn'>Login</button>
              </div>
            </form>
            <div className='listing-form__img'></div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Login
