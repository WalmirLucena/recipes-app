export default async function fetchArea() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

  try {
    const response = await fetch(URL);
    const json = await response.json();
    const foods = await json.meals;

    return foods;
  } catch (err) {
    console.error(err);
  }
}
