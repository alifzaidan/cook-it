class backButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  switchPage() {
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const details = document.querySelector('.details');
    main.style.display = 'block';
    header.style.display = 'grid';
    details.style.display = 'none';
  }

  render() {
    this.innerHTML = `
    <style>
      .form-button {
        background-color: #000;
        width: fit-content;
        margin: auto;
      }

      .form-back {
        outline: none;
        font-size: 1rem;
        padding: 0.2rem 0.5rem;
        height: 42px;
        border: 2.5px solid #000;
        color: #000;
        background-color: #abfa00;
        cursor: pointer;
        transition: transform 0.3s;
      }
      
      .form-back:hover {
        transform: translate(-6px, -6px);
      }
    </style>
      <div class="form-button">
        <button type="button" class="form-back" id="backToLanding">Back</button>
      </div>
    `;

    const renderResult = () => {
      this.switchPage();

      const detailTitle = document.querySelector('#detailTitle');

      const filterBy = document.querySelector('.filterBy');
      filterBy.remove();

      const filterByNew = document.createElement('p');
      filterByNew.className = 'filterBy fs-md-3';
      detailTitle.appendChild(filterByNew);

      const titleRecipes = document.querySelector('.titleRecipes');
      titleRecipes.remove();

      const titleRecipesNew = document.createElement('h1');
      titleRecipesNew.className = 'titleRecipes';
      detailTitle.appendChild(titleRecipesNew);

      const ingredients = document.querySelector('.ingredientsDetail');
      while (ingredients.hasChildNodes()) {
        ingredients.removeChild(ingredients.firstChild);
      }

      const methods = document.querySelector('.methods');
      while (methods.hasChildNodes()) {
        methods.removeChild(methods.firstChild);
      }
    };

    const backToLanding = document.querySelector('#backToLanding');
    backToLanding.addEventListener('click', function () {
      renderResult();
    });
  }
}

customElements.define('back-button', backButton);
