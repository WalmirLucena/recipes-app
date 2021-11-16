export default async function fetchIngredients(type) {
  let currentURL = '';

  if (type === 'food') { currentURL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'; }
  if (type === 'drink') { currentURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'; }

  try {
    if (type === 'food') {
      const response = await fetch(currentURL);
      const json = await response.json();
      const foods = await json.meals;

      return foods;
    }

    if (type === 'drink') {
      const response = await fetch(currentURL);
      const json = await response.json();
      const drinks = await json.drinks;

      return drinks;
    }
  } catch (err) {
    console.error(err);
  }
}
