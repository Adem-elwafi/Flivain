import React from 'react';
import Header from './sections/Header/Header';
import Hero from './sections/Hero/Hero';
import BookingWidget from './sections/BookingWidget/BookingWidget';
import OffersSeats from './sections/OffersSeats/OffersSeats';
import DestinationsFooter from './sections/DestinationsFooter/DestinationsFooter';
import './styles/globals.css';

export function App(): React.JSX.Element {
  return (
    <div className="flivainApp">
      <Header />
      <main id="main-content">
        <Hero />
        <BookingWidget />
        <OffersSeats />
      </main>
      <DestinationsFooter />
    </div>
  );
}

export default App;
