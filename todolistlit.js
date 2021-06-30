import { LitElement, html } from "https://unpkg.com/lit-element/lit-element.js?module"

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
    margin-left: 9.5%;
}
`

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);



export class TodoView extends LitElement {

    static get properties() {
        return {
            todos: {type: Array},
            task: {type: String}

        }
    }

    static get styles () {
        return [sheet];
    }

    constructor(){
        super();
        this.todos = [{
            task: "primera",
            complete: false
        },
        {
            task: "segunda",
            complete: false
        },
        {
            task: "tercera",
            complete: false
        },
    ];
        this.messageAdd = 'Add Todo';
        this.task = '';
    }

    render() {
        return html`
        <h1>TodoList LitElement</h1>

        <div class="todos-lists">
            ${this.todos.map(todo=> html`
                <span class="single-item">
                ${todo.task}
                </span>

                <button
                class="button-item"
                @click="${e => this.updateTodoStatus(todo)}"
                >
                -
                </button>
            `)}
        </div>

        <div class="input-layout" @keyup="${this.shortcutListener}">
        <span class="text-add">${this.messageAdd}</span>
        <input
        class="input-add"
            type="text"
            placeholder="Todo"
            .value="${this.task}"
            @change="${this.updateTask}"
        >
        <button
            class="button-add"
            @click="${this.addTodo}"
        >
        +
        </button>
        </div>
        `;
    }

    updateTodoStatus(updatedTodo){
        updatedTodo.complete = true;
        this.todos = this.todos.filter(todo =>!todo.complete);
    }

    shortcutListener(e){
        if(e.key === "Enter"){
            this.addTodo()
        }
    }

    updateTask(e){
        this.task = e.target.value;
    }

    addTodo(){
        if(this.task){
            console.log("addTodo")
            this.todos = [ ... this.todos, {
                task: this.task,
                complete: false
            }];
            this.task = '';
        }
    }
}

customElements.define('todo-view', TodoView);