import funcFilterObjDetails from './funcFilterObjDetails';

export default function VerifyStorage(detailRecipe, comida, id) {
  const ingredientMeasure = funcFilterObjDetails(detailRecipe);

  const teste = ingredientMeasure.reduce((acc, ingredient) => {
    const obj = {
      [Object.keys(ingredient)]: Object.values(ingredient)[0],
      checked: false };
    acc.push(obj);
    return acc;
  }, []);
  console.log(teste);

  const inProgresStore = JSON.parse(localStorage.getItem('inProgressRecipes'));
  console.log(inProgresStore);
  if (!inProgresStore) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {
      },
      meals: {
      },
    }));
  }
  if (comida) {
    if (inProgresStore.meals[id]) {
      const values = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...values,
        meals: {
          [detailRecipe.idMeal]: teste,
        },
      }));
    } else {
      return inProgresStore.meals[id];
    }
  } else if (!inProgresStore.cocktails[id]) {
    const values = JSON.parse(localStorage.getItem('inProgressRecipes'));

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...values,
      cocktails: {
        [detailRecipe.idDrink]: teste,
      },
    }));
  } else {
    return inProgresStore.cocktails[id];
  }
}
