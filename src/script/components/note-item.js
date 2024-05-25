class NoteItem extends HTMLElement{
    _note={
        id: null,
        title:null,
        body:null,
        createdAt:null,
        archived:null,
    }
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({mode:'open'});
        this._style=document.createElement('style');
    }
    set note(value){
        this._note=value;
        this.render();
    }
    get note(){
        return this._note;
    }
    _updateStyle(){
        this._style.textContent=`
            :host{
                background-color: var(--white);
                cursor: pointer;
            }
            div{
                height: 120px;
                padding: 10px;
            }
            .title{
                font-size: 22px;
                font-weight: 600;
                font-family: var(--display);
                margin:0
            }
            .date{
                font-size: 14px;
                font-weight: 400;
                margin-bottom: 10px;
                margin-top:5px;
            }
        `
    }
    preview(text, maxString=30){
        if(text!=null){
            let preview = text.substring(0, maxString);
            if (text.length > maxString) {
                preview += '........';
            };
            return preview;
        }
        return
    }
    render(){
        this._shadowRoot.innerHTML = '';
        this._updateStyle();
        this.shadowRoot.appendChild(this._style);
        this.shadowRoot.innerHTML+=`
        <div id='${this._note.id}'>
            <h2 class="title">${this.preview(this._note.title,20)}</h2>
            <p class="date">${new Date(this._note.createdAt)}</p>
            <p class="body">${this.preview(this._note.body)}</p>
        </div>
        `
        this._shadowRoot.querySelector(`#${this._note.id}`).addEventListener('click',()=>{
            let noteDetail = document.querySelector('note-detail');
            if (noteDetail) {
                noteDetail.remove();
            }
            if(window.innerWidth<992){
                document.querySelector('#container-detail').classList.toggle('active');
                document.querySelector('#container-list').classList.toggle('active');
                document.querySelector('#container-detail').classList.toggle('not-active');
                document.querySelector('#container-list').classList.toggle('not-active');
            }
            noteDetail=document.createElement('note-detail');
            document.querySelector('#message').classList.add('d-none');
            const noteDetailContainer=document.querySelector('#container-detail')
            noteDetail.data=this._note;
            noteDetailContainer.append(noteDetail);
        })
    }
}
customElements.define('note-item', NoteItem);