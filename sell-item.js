import 'https://cdn.skypack.dev/construct-style-sheets-polyfill';

const styles = /*css*/`
.wrapper{
  margin: 10px;

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
  font-size: 20px;
    padding: 3%;
}

.item-card {
    display: flex;
    width: 350px;

    flex-direction: column;
    align-items: center;
    border-style: solid;
    margin: 10%;
}

.photo {
  width: 240px;
  height: 240px;

}

.aux1 {
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin: 10%;

}
.flex {
    display: flex;
    margin-left: 10%;
    margin-right: 10%;
    min-width: 70%;
    float: left;

}
`

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const template = document.createElement("template");
template.innerHTML = /*html*/`
<div class='wrapper visible'>
    <div class= "item-card">
        <h1 class='title'>Titulo</h1>
        <img class='photo' src="pic_trulli.jpg" alt="product-img">
        <span class ="flex">PRECIO NORMAL: <del class= 'normal-price'>$????</del></span>
        <span class='flex'>DESCUENTO: <ins class='discount'>??%</ins></span>
        <span class='flex'>PRECIO CON DESCUENTO: <span class='discount-price'>$???</span></span>
        <span class='flex'>RATING: <span class='rating'>?/5</span> </span>
    </div>
</div>
`

class Modal extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({"mode": "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.adoptedStyleSheets = [sheet];
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
}

window.customElements.define("sell-item", Modal);