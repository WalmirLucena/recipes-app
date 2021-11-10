export default async function fetchFood(radio, input) {
  let currentURL = '';

  if (radio === 'ingrediente') { currentURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`; }
  if (radio === 'nome') { currentURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`; }
  if (radio === 'letra') { currentURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`; }

  try {
    const response = await fetch(currentURL);
    const json = await response.json();
    const foods = json.meals;

    return foods;
  } catch (err) {
    console.error(err);
  }
}
