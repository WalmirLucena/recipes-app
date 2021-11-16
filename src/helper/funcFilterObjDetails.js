export default function funcFilterObjDetails(recipe) {
  const ingredient = recipe && Object.entries(recipe).filter((e) => {
    const ternario = e[1] !== '' && e[1] !== null;
    let ingredientes;
    if (e[0].includes('strIngredient') && ternario) {
      ingredientes += e[1];
    }
    return ingredientes;
  });

  const measure = recipe && Object.entries(recipe).filter((e) => {
    const ternario = e[1] !== '' && e[1] !== null;
    let medida;
    if (e[0].includes('strMeasure') && ternario) {
      medida += e[1];
    }
    return medida;
  });

  const ingredientMeasute = () => {
    let obj = [];
    for (let i = 0; i < ingredient.length; i += 1) {
      const measureTest = measure[i];
      const ingredientTest = ingredient[i];
      const measureTest2 = measureTest[1];
      const ingredientTest2 = ingredientTest[1];

      const obj2 = {
        [ingredientTest2]: measureTest2,
      };
      obj = [
        ...obj,
        obj2,
      ];
    }
    return obj;
  };
  return ingredientMeasute();
}
