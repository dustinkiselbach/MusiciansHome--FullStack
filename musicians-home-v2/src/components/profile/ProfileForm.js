import React, { useState, useContext } from 'react'
import ProfileContext from '../../context/profile/profileContext'
import TextFieldGroupNew from '../common/TextFieldGroupNew'

const ProfileForm = () => {
  const profileContext = useContext(ProfileContext)

  const { createUserProfile, errors } = profileContext

  const [fields, setFields] = useState({
    brithday: '',
    lookingfor: ''
  })

  const onChange = e => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()

    const newProfile = {
      birthday: fields.birthday,
      lookingfor: fields.lookingfor
    }

    createUserProfile(newProfile)
  }

  return (
    <div className='user-form-all'>
      <div className='overlay'>
        <div className='container'>
          <section className='user-form'>
            <form onSubmit={onSubmit}>
              <h2 className='user-form__title title'>Create Profile</h2>
              <div className='user-form__form-area'>
                <TextFieldGroupNew
                  name='birthday'
                  type='text'
                  onChange={onChange}
                  placeholder='birthday'
                  error={errors.birthday}
                />
                <TextFieldGroupNew
                  name='lookingfor'
                  type='text'
                  onChange={onChange}
                  placeholder='lookingfor'
                  error={errors.lookingfor}
                />

                <button className='btn'>Create Profile</button>
              </div>
            </form>
            <div className='listing-form__img'></div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
