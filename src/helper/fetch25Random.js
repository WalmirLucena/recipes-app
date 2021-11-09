export default async function fetch25Random(type) {
  let currentURL = '';

  if (type === 'food') { currentURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; }
  if (type === 'drink') { currentURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='; }

  try {
    if (type === 'food') {
      const response = await fetch(currentURL);
      const json = await response.json();
      const meals = await json.meals;
      // console.log(type);
      return meals;
    }
    if (type === 'drink') {
      const response = await fetch(currentURL);
      const json = await response.json();
      const drinks = await json.drinks;
      // console.log(type);
      return drinks;
    }
  } catch (err) {
    console.error(err);
  }
}
