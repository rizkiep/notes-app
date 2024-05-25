class NotesList extends HTMLElement{
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({mode:'open'});
        this._style=document.createElement('style');
        this.render();
    }
    _updateStyle(){
        this._style.textContent=`
            :host{
                background-color: #2563EA;
                height: calc(100% - 40px - 30px);
            }
            .list{
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: max-content;
                gap: 20px;
                padding: 20px;
                padding-bottom: 50px;
                justify-content: space-around;
                overflow-y: auto;
                scrollbar-width: none;
                height: 90%;
            }
            @media screen and (max-width: 600px) {
                .list{
                    grid-template-columns: 100%;
                }
            }
            `;
    }
    render(){
        this._shadowRoot.innerHTML=''
        this._updateStyle();
        this.shadowRoot.appendChild(this._style);
        this.shadowRoot.innerHTML+=`
        <div class='list'>
            <slot></slot>
        </div>
        `
    }
}
customElements.define('notes-list', NotesList);