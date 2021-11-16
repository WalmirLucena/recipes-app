export default async function fetch25Random(type) {
  let currentURL = '';

  if (type === 'food') { currentURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; }
  if (type === 'drink') { currentURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='; }

  try {
    if (type === 'food') {
      const response = await fetch(currentURL);
      const json = await response.json();
      const meals = await json.meals;
      const limit = 6;
      let resp6 = [];
      for (let i = 0; i < limit; i += 1) {
        const unidade = meals[i];
        resp6 = [
          ...resp6,
          unidade,
        ];
      }
      return resp6;
    }
    if (type === 'drink') {
      const response = await fetch(currentURL);
      const json = await response.json();
      const drinks = await json.drinks;
      const limit = 6;
      let resp6 = [];
      for (let i = 0; i < limit; i += 1) {
        const unidade = drinks[i];
        resp6 = [
          ...resp6,
          unidade,
        ];
      }
      return resp6;
    }
  } catch (err) {
    console.error(err);
  }
}
