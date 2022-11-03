class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#searchElement').value;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        .form {
          display: grid;
          place-items: center;
          margin: 0 1.5rem 1.5rem 1.5rem;
        }
        
        .form-content {
          display: flex;
          gap: 1rem;
        }
        
        .form-input,
        .form-label,
        .form-submit {
          border: 0;
          outline: none;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
        }
        
        .form-box {
          width: 512px;
          height: 59px;
          position: relative;
        }
        
        .form-shadow {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #000;
        }
        
        .form-input {
          position: absolute;
          border: 2.5px solid #000;
          background-color: #fff;
          width: 100%;
          height: 100%;
          z-index: 10;
          padding: 18px;
          transition: transform 0.3s;
        }
        
        .form-input::placeholder {
          transition: opacity 0.5s;
        }
        
        .form-label {
          z-index: 100;
          position: absolute;
          top: 16px;
          left: 20px;
          font-size: 0.563rem;
          font-weight: 600;
          transition: 0.2s;
          pointer-events: none;
          opacity: 0;
        }
        
        .form-button {
          background-color: #000;
        }
        
        .form-submit {
          padding: 0.875rem 1.5rem;
          height: 59px;
          border: 2.5px solid #000;
          color: #000;
          background-color: #abfa00;
          cursor: pointer;
          transition: transform 0.3s;
        }
        
        .form-submit:hover {
          transform: translate(-8px, -8px);
        }
        
        /* Opaque placeholder */
        .form-input:focus::placeholder {
          opacity: 0;
          transition: 0.3s;
        }
        
        /* Move input and sticky input up */
        .form-input:focus,
        .form-input:not(:placeholder-shown).form-input:not(:focus) {
          transform: translate(-8px, -8px);
          padding: 28px 18px 18px;
          animation: input-animation 0.5s;
        }
        
        /* Move label and sticky label up */
        .form-input:focus + .form-label,
        .form-input:not(:placeholder-shown).form-input:not(:focus) + .form-label {
          opacity: 1;
          top: 2px;
          left: 12px;
          transition: 0.3s;
        }
        
        /* Input bounce animation */
        @keyframes input-animation {
          0% {
            transform: translate(0);
          }
          40% {
            transform: translate(-9px, -9px);
          }
          60% {
            transform: translate(-7px, -7px);
          }
        }
        
        @media screen and (max-width: 860px) {
          .form-box {
            width: 352px;
          }
        }

        @media screen and (max-width: 574px) {
          .form-box {
            width: 252px;
          }
        }
        
        @media screen and (max-width: 456px) {
          .form-content,
          .form-box {
            width: 100%;
          }

          .form {
            margin: 0;
          }
        }

        @media screen and (min-width: 968px) {
          .form-content {
            zoom: 1.1;
          }
        }
      </style>

      <div class="form">
        <div id="search-container" class="form-content">
          <div class="form-box">
            <input type="search" class="form-input" id="searchElement" placeholder="Search Meal" />
            <label for="" class="form-label">SEARCH MEAL</label>
            <div class="form-shadow"></div>
          </div>
          <div class="form-button">
            <button type="submit" class="form-submit" id="searchButtonElement">Search</button>
          </div>
        </div>
      </div>
    `;

    this.shadowDOM.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent);
  }
}

customElements.define('search-bar', SearchBar);
