import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module"

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
    margin-left: 1%;
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

.global{
        display: flex;
        flex-direction: row;

}
`

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);



export class SellItem extends LitElement {

    static get properties() {
        return {
            items: {type: Array}

        }
    }

    static get styles () {
        return [sheet];
    }

    constructor(){
        super();
        this.items = [{
            normalPrice: "1000000",
            title: "GPU ASI BIEN CABRONA",
            photo: "img/1.jpg",
            discount: "20",
            discountPrice: "800000",
            rating: "4",
        },
        {
            normalPrice: "20000",
            title: "POLERA DEL TIO ELON",
            photo: "img/2.jpg",
            discount: "50",
            discountPrice: "10000",
            rating: "5",
        }
    ];
    }

    render() {
        return html`

        <div class='global'>
        ${this.items.map(item=> html`
                <div class= "item-card">
                    <h1 class='title'>
                    ${item.title}
                    </h1>
                    <img class='photo'
                    src="${item.photo}" alt="product-img">
                    <span class ="flex">PRECIO NORMAL: <del class= 'normal-price'>${item.price}</del></span>
                    <span class='flex'>DESCUENTO: <ins class='discount'>${item.discount}%</ins></span>
                    <span class='flex'>PRECIO CON DESCUENTO: <span class='discount-price'>$${item.discountPrice}</span></span>
                    <span class='flex'>RATING: <span class='rating'>${item.rating}/5</span> </span>
                </div>
            `)}
        </div>
        `;
    }
}

customElements.define('sell-item-view', SellItem);