class backButton extends HTMLElement {
  connectedCallback() {
    this.render();
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

    const backToLanding = document.querySelector('#backToLanding');
    backToLanding.addEventListener('click', function () {
      const header = document.querySelector('header');
      const main = document.querySelector('main');
      const details = document.querySelector('.details');
      main.style.display = 'block';
      header.style.display = 'grid';
      details.style.display = 'hide';
      console.log(main);
      console.log(header);
      console.log(details);
    });
  }
}

customElements.define('back-button', backButton);
