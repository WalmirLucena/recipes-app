export default async function fetchRandom(type) {
  let currentURL = '';

  if (type === 'food') { currentURL = 'https://www.themealdb.com/api/json/v1/1/random.php'; }
  if (type === 'drink') { currentURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'; }

  try {
    if (type === 'food') {
      const response = await fetch(currentURL);
      const json = await response.json();
      const foods = await json.meals[0];

      return foods;
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
