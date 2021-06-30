const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>
  .wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0;
  visibility: hidden;
  transform: scale(1.1);
  transition: visibility 0s linear .25s,opacity .25s 0s,transform .25s;
  z-index: 1;
}
.visible {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  transition: visibility 0s linear 0s,opacity .25s 0s,transform .25s;
}
.modal {
  font-family: Helvetica;
  font-size: 14px;
  padding: 10px 10px 5px 10px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 2px;
  min-width: 300px;
}
.title {
  font-size: 28px;
    padding: 3%;
}

.item-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-style: solid;
    margin: 10%;
}
.photo {
    max-height: auto;
    max-width: 100%;
}

.aux1 {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 2%;
}
.flex {
    display: flex;
}
</style>
<div class='wrapper visible'>
    <div class= "item-card">
        <h1 class='title'>Titulo</h1>
        <div class= "img-cont">
            <img class='photo' src="pic_trulli.jpg" alt="product-img">
        </div>
        <div class='aux1'>
            <span class ="flex">PRECIO NORMAL: <del class= 'normal-price'>$????</del></span>
            <span class='flex'>DESCUENTO: <ins class='discount'>??%</ins></span>
        </div>
        <div class='aux1'>
            <span class='flex'>PRECIO CON DESCUENTO: <span class='discount-price'>$???</span></span>
            <span class='flex'>RATING: <span class='rating'>?/5</span> </span>
        </div>
    </div>
        
</div>
`

class Modal extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({"mode": "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes () {
    return [
        "title", 
        "visible", 
        "photo", 
        "discount", 
        "discount-price", 
        "normal-price",
        "rating"
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title") {
      this.shadowRoot.querySelector(".title").textContent = newValue;
    } else if (name === "visible") {
      if (newValue === null) {
        this.shadowRoot.querySelector(".wrapper").classList.remove("visible");
      } else {
        this.shadowRoot.querySelector(".wrapper").classList.add("visible");
      }
    } else if (name === "photo") {
      this.shadowRoot.querySelector(".photo").src = newValue;
    } else if (name === "normal-price") {
      this.shadowRoot.querySelector(".normal-price").textContent = " $" + newValue;
    } else if (name === "discount-price") {
      this.shadowRoot.querySelector(".discount-price").textContent = " $" + newValue;
    } else if (name === "discount") {
      this.shadowRoot.querySelector(".discount").textContent = " " + newValue + "%";
    } else if (name === "rating") {
      this.shadowRoot.querySelector(".rating").textContent = newValue + "/5";
    }
  }

  connectedCallback () {
    const cancelButton = this.shadowRoot.querySelector(".cancel");
    cancelButton.addEventListener("click", e => {
      this.removeAttribute("visible");
    });
    const okButton = this.shadowRoot.querySelector(".ok");
    okButton.addEventListener("click", e => {
      this.removeAttribute("visible");
    });
  }

  disconectedCallback() {
    const cancelButton = this.shadowRoot.querySelector(".cancel");
    cancelButton.removeEventListener();
    const okButton = this.shadowRoot.querySelector(".ok");
    okButton.removeEventListener();
  }
}

window.customElements.define("sell-item", Modal);s