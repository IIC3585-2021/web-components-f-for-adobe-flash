import 'https://cdn.skypack.dev/construct-style-sheets-polyfill';


const styles = /*css*/`
.single-item {
    font-family: 'Arial', sans-serif;
    background: #f4f4f4;
    width: 60%;
    display: inline-block;
    justify-content: space-between;
    margin-bottom: 15px;
    border-bottom: slategrey 5px solid;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.text-add {
    font-family: 'Arial', sans-serif;
    width: 15%;
    display: inline-block;
}

.input-add {
    font-family: 'Arial', sans-serif;
    width: 44.5%;
    display: inline-block;
}

.button-item {
    display: inline-block;
    width: 3%;
    margin-left: 10%;
}

.button-add {
    display: inline-block;
    width: 3%;
    margin-left: 10%;
}
`

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const template = document.createElement('template');
template.innerHTML = /*html*/`

    <div class="general">

        <h1 class='titulo'>Titulo</h1>

        <div class="item_div">
        </div>

        <div class="adding-div">
        </div>

    </div>
`;

class TodoList extends HTMLElement {
    constructor() {
        super();

        this.showInfo = true;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.adoptedStyleSheets = [sheet];
    }

    static get observedAttributes (){
        return ["item1", "item2", "item3", "promt", "titulo"]
    }

    addelem(elem){
        let single_item = document.createElement('span');
        let button_item = document.createElement('button');
        single_item.setAttribute('class', 'single-item');
        button_item.setAttribute('class', 'button-item');
        single_item.innerText = elem;
        button_item.innerText = '-';
        this.shadowRoot.querySelector(".item_div").appendChild(single_item);
        this.shadowRoot.querySelector(".item_div").appendChild(button_item);
    }

    addListBtn(btn){
        btn.addEventListener("click", e => {
        let item_delete = e.target.previousSibling;
        this.shadowRoot.querySelector(".item_div").removeChild(e.target);
        this.shadowRoot.querySelector(".item_div").removeChild(item_delete);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "titulo"){
            this.shadowRoot.querySelector(".titulo").textContent = newValue;
        } else if (name.startsWith("item") ){
            this.addelem(newValue);

        } else if("promt"){
            let text_adding = document.createElement('span');
            let input_adding = document.createElement('input');
            let button_adding = document.createElement('button');
            text_adding.setAttribute('class', 'text-add');
            input_adding.setAttribute('class', 'input-add');
            button_adding.setAttribute('class', 'button-add');

            text_adding.innerText = newValue;
            button_adding.innerText = '+';

            this.shadowRoot.querySelector(".adding-div").appendChild(text_adding);
            this.shadowRoot.querySelector(".adding-div").appendChild(input_adding);
            this.shadowRoot.querySelector(".adding-div").appendChild(button_adding);


        }
    }

    connectedCallback() {
        let removeButton = this.shadowRoot.querySelectorAll(".button-item");
        removeButton.forEach(btn => this.addListBtn(btn));

        const addButton = this.shadowRoot.querySelector(".button-add");
        addButton.addEventListener("click", e => {
            let text_inside_input = e.target.previousSibling.value;
            if (text_inside_input !== ''){
                this.addelem(text_inside_input);
                e.target.previousSibling.value = "";
                let btn_new = (this.shadowRoot.querySelector(".button-item:last-child"));
                this.addListBtn(btn_new)
            }
        })
    }

    disconnectedCallback() {
        const removeButton = this.shadowRoot.querySelectorAll(".button-item");
        removeButton.forEach(btn => btn.removeEventListener());
    }

}

window.customElements.define('todo-list', TodoList);