import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import fetchIDAPI from '../helper/fetchIDAPI';
import fetch25Random from '../helper/fetch25Random';
import CarouselComp from '../components/CarouselComponents/CarouselComp';
import RecipeDetailTop from '../components/DetalhesComponents/RecipeDetailTop';
import RecipeDetailBotom from '../components/DetalhesComponents/RecipeDetailBotom';

export default function Detalhes() {
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState({});
  const [random6, setRandom6] = useState(null);
  const [filterId, setFilterId] = useState('');
  const [btnIniciar, setBtnIniciar] = useState(true);

  // const filterId = pathname.match(/\d+((.|,)\d+)?/)[0];
  const teste = { btnIniciar, setBtnIniciar };

  const updateId = async () => {
    setFilterId(pathname.match(/\d+((.|,)\d+)?/)[0]);
  };

  const fetchAPIId = async () => {
    if (pathname.includes('/comidas')) {
      const resonse = await fetchIDAPI('food', filterId);
      setRecipe(resonse);
    }

    if (pathname.includes('/bebidas')) {
      const resonse = await fetchIDAPI('drink', filterId);
      setRecipe(resonse);
    }
  };

  const fetch6 = async () => {
    const resp = await fetch25Random(pathname.includes('/bebidas') ? 'food' : 'drink');
    setRandom6(resp);
  };

  useEffect(() => {
    updateId();
  }, []);

  useEffect(() => {
    if (filterId !== '') {
      fetchAPIId();
      fetch6();
    }
  }, [filterId]);

  if (!recipe || !random6) return <span>Loading</span>;
  return (
    <div>
      <RecipeDetailTop recipe={ recipe } />
      <br />
      <CarouselComp random6={ random6 } />
      <br />
      <RecipeDetailBotom recipe={ recipe } teste={ teste } />
    </div>
  );
}
