export default async function fetchCategoryFoodApi() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
