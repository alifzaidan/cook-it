import './back-button.js';
import DataSource from '../data/data-source.js';

class MealItem extends HTMLElement {
  constructor() {
    super();
  }

  set meal(meal) {
    this._meal = meal;
    this.render();
  }

  switchPage() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const details = document.querySelector('.details');
    main.style.display = 'none';
    header.style.display = 'none';
    details.style.display = 'block';
  }

  render() {
    this.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .card-bg{
          background-color: #000;
        }
        .card {
          margin-top: 12px;
          border: 2.5px solid black;
          padding: 1.2rem;
          background-color: #e3d2bf;
          transition: transform 0.3s;
        }
        .card:hover {
          transform: translate(-8px, -8px);
          cursor: pointer;
        }
        .card > img {
          width: 100%;
          border: 2.5px solid black;
        }
        .card-info {
          display: flex;
          justify-content: space-between;
          opacity: 0.8;
          margin-bottom: 4px;
        }

        @media screen and (max-width: 992px) {
          .card-info p {
            font-size: 0.8rem;
          }
        }
      </style>

      <div class="card-bg">
        <div class="card card-recipe" data-id="${this._meal.idMeal}">
          <div class="card-info">
            <p>${this._meal.strCategory}</p>
            <p>${this._meal.strArea}</p>
          </div>
          <img src=${this._meal.strMealThumb} class="card-img-top" alt="${this._meal.strMeal}" />
          <h2>${this._meal.strMeal}</h2>
        </div>
      </div>
    `;

    const mealRecipes = async (id) => {
      try {
        const result = await DataSource.mealRecipes(id);
        renderResult(result);
      } catch (message) {
        fallbackResult(message);
      }
    };

    const renderResult = (results) => {
      this.switchPage();

      const filterBy = document.querySelector('.filterBy');
      filterBy.append(`${results.meals[0].strCategory} | ${results.meals[0].strArea}`);

      const titleRecipes = document.querySelector('.titleRecipes');
      titleRecipes.append(results.meals[0].strMeal);

      const detailImage = document.querySelector('#detailImage');
      detailImage.setAttribute('src', results.meals[0].strMealThumb);

      const ingredients = document.querySelector('.ingredientsDetail');

      const meal = results.meals[0];
      for (let i = 1; meal[`strIngredient${i}`]; i++) {
        const ingredient = `✔ ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`;
        const detailIngredient = document.createElement('li');
        detailIngredient.className = 'list-group-item';
        detailIngredient.innerText = ingredient;
        ingredients.appendChild(detailIngredient);
      }

      const instructionsText = results.meals[0].strInstructions.split('\r\n');
      const methods = document.querySelector('.methods');
      instructionsText.forEach((step) => {
        const stepRecipes = document.createElement('li');
        stepRecipes.className = 'list-group-item';
        stepRecipes.innerText = step;
        methods.appendChild(stepRecipes);
      });

      window.scrollTo(0, 0);
    };

    const fallbackResult = (message) => {
      alert(message);
    };

    const cardRecipe = this.querySelector('.card-recipe');
    cardRecipe.addEventListener('click', function () {
      const idReceipe = this.getAttribute('data-id');
      mealRecipes(idReceipe);
    });
  }
}

customElements.define('meal-item', MealItem);
