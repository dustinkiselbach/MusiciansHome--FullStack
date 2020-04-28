import React from 'react'
// import { Link } from 'react-router-dom'

const InfoCard = ({ card }) => {
  const { title, icon, text } = card
  return (
    <div className='card'>
      <span className='material-icons'>{icon}</span>
      <div className='card__text'>
        <h1 className='title card__title'>{title}</h1>
        <p className='lead card__p'>{text}</p>
        <button className='btn'>Read more</button>
      </div>
    </div>
  )
}

export default InfoCard
