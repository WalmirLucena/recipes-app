import PropTypes from 'prop-types';
import React from 'react';
import CardsRec from './CardsRec';

export default function CarouselComp({ random6 }) {
  // console.log(random6[0]);
  return (
    <>
      <CardsRec e1={ random6[0] } i={ 0 } vis />
      <CardsRec e1={ random6[1] } i={ 1 } vis />
      <CardsRec e1={ random6[2] } i={ 2 } vis={ false } />
      <CardsRec e1={ random6[3] } i={ 3 } vis={ false } />
      <CardsRec e1={ random6[4] } i={ 4 } vis={ false } />
      <CardsRec e1={ random6[5] } i={ 5 } vis={ false } />
    </>
  );
}

CarouselComp.propTypes = {
  random6: PropTypes.arrayOf(PropTypes.any).isRequired,
};
