export default async function fetchDrinkByCategory(category) {
  try {
    const urlBase = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    const response = await fetch(`${urlBase}${category}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
