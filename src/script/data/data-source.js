class DataSource {
  static searchMeal(keyword) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.meals) {
          return Promise.resolve(responseJson.meals);
        } else {
          return Promise.reject(`${keyword} is not found`);
        }
      });
  }

  static mealRecipes(id) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson) {
          return Promise.resolve(responseJson);
        } else {
          return Promise.reject(`${id} is not found`);
        }
      });
  }
}

export default DataSource;
