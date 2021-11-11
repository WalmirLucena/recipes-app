export const fetchAPIId = async () => {
  if (pathname.includes('/comidas')) {
    setLoadingFood(true);
    const resonse = await fetchIDAPI('food', filterId);
    setRecipe(resonse);
    setLoadingFood(false);
  }

  if (pathname.includes('/bebidas')) {
    setLoadingDrink(true);
    const resonse = await fetchIDAPI('drink', filterId);
    setRecipe(resonse);
    setLoadingDrink(false);
  }
};

export const fetch6 = async () => {
  const resp = await fetch25Random(pathname.includes('/bebidas') ? 'food' : 'drink');
  const limit = 6;
  let resp6 = [];
  if (resp) {
    for (let i = 0; i < limit; i += 1) {
      const unidade = resp[i];
      resp6 = [
        ...resp6,
        unidade,
      ];
    }
  }
  setRandom6(resp6);
};
