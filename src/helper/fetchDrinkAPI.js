export default async function fetchDrink(radio, input) {
  let currentURL = '';

  if (radio === 'ingrediente') { currentURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`; }
  if (radio === 'nome') { currentURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`; }
  if (radio === 'letra') { currentURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`; }

  try {
    const response = await fetch(currentURL);
    const json = await response.json();
    const drink = json.drinks;

    return drink;
  } catch (err) {
    console.error(err);
  }
}
