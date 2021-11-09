export default async function fetchCategoryFoodApi() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    console.log('response', response);
    const data = response.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
