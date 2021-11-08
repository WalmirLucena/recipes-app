export default async function fetchIDAPI(type, id) {
  let currentURL = '';

  if (type === 'food') { currentURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`; }
  if (type === 'drink') { currentURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`; }

  try {
    if (type === 'food') {
      const response = await fetch(currentURL);
      const json = await response.json();
      const meals = await json.meals[0];
      return meals;
    }
    if (type === 'drink') {
      const response = await fetch(currentURL);
      const json = await response.json();
      const drinks = await json.drinks[0];
      return drinks;
    }
  } catch (err) {
    console.error(err);
  }
}
