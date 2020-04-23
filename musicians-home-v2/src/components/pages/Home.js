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
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit 123 woa that cheese.'
    },
    {
      id: 2,
      title: 'Eat out of a fridge',
      icon: 'kitchen',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit chesey poofs r gud'
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
