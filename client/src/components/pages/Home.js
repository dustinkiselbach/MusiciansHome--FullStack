import React, { Fragment, useState } from 'react'
import Header from '../layout/Header'
import InfoCard from '../layout/InfoCard'
import Footer from '../layout/Footer'

const Home = () => {
  const [cards] = useState([
    {
      id: 1,
      title: 'Find your place',
      icon: 'house',
      text: 'Find a sublet with like minded artists and musicians.'
    },
    {
      id: 2,
      title: 'A place you"ll love',
      icon: 'favorite',
      text: 'Stay for as long as you want to in the places you want to.'
    }
  ])
  return (
    <Fragment>
      <Header />
      <div className='container'>
        <section className='card-section'>
          {cards.map(card => (
            <InfoCard card={card} key={card.id} />
          ))}
        </section>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Home
