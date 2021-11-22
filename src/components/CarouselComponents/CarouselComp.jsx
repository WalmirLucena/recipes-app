import PropTypes from 'prop-types';
import React from 'react';
import CardsRec from './CardsRec';
import '../../styles/Carousel.css';

export default function CarouselComp({ random6 }) {
  // console.log(random6[0]);
  return (
    <div className="caurosel-container">
      <h3>Recommended</h3>
      <CardsRec e1={ random6[0] } i={ 0 } vis />
      <CardsRec e1={ random6[1] } i={ 1 } vis />
      <CardsRec e1={ random6[2] } i={ 2 } vis={ false } />
      <CardsRec e1={ random6[3] } i={ 3 } vis={ false } />
      <CardsRec e1={ random6[4] } i={ 4 } vis={ false } />
      <CardsRec e1={ random6[5] } i={ 5 } vis={ false } />
    </div>
  );
}

CarouselComp.propTypes = {
  random6: PropTypes.arrayOf(PropTypes.any).isRequired,
};
