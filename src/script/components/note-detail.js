import { notesData } from "../data/notes.js";
class NoteDetail extends HTMLElement{
    _data={
        title:null,
        createdAt:null,
        body:null
    }
    constructor(){
        super();
        this._shadowRoot=this.attachShadow({mode:'open'});
        this._style=document.createElement('style');
    }
    set data(value){
        this._data=value;
        this.render();
    }
    get data(){
        return this._data;
    }
    _updateStyle(){
        this._style.textContent=`
            :host{
                background-color: #FAFAFA;
                height: 100%;
            }
            .detail{
                padding: 0 20px;
                padding-bottom: 50px;
                overflow-y: auto;
                scrollbar-width: none;
                height: 90%;
            }
            .detail h1{
                text-align: center;
                margin-bottom: 5px;
                margin-top:0;
                font-family:"DM Serif Display", serif;
                font-size:28px
            }
            .detail p{
                margin-top:0;
                margin-bottom:20px;
                font-size:12px;
                font-weight: 400 ;
            }
            .detail pre{
                margin-top:0;
                margin-bottom:20px;
                font-size:14px;
            }
            .btn-list{
                display: grid;
                justify-content: space-around;
                grid-template-columns: 1fr 1fr;
                padding:0 40px;
                margin-bottom: 30px;
            }
            .btn-list button{
                height: 40px;
                border: none;
                border-radius: 20px;
                color: white;
                cursor: pointer;
                margin-left: 20px;
            }
            .btn-list .edit{
                background-color: var(--blue);
            }
            .btn-list .delete{
                background-color: red;
            }
            .btn-list .back{
                background-color: black;
                color: white;
                height: 40px;
                border: none;
                border-radius: 20px;
                cursor: pointer;
                margin-left: 20px;
                display:none;
            }
            @media screen and (max-width: 991px){
                .btn-list{
                    grid-template-columns: 0.8fr 1fr 1fr;
                }
                .btn-list .back{
                    display:block;
                }
            }
            `;
    }
    editNote(){
        document.querySelector('main').style.gridTemplateColumns="1fr";
        document.querySelector('#form-container').classList.remove('d-none');
        document.querySelector('#container-list').classList.add('d-none')
        document.querySelector('#container-detail').classList.add('d-none');
        const form=document.querySelector('form-note');
        form.formNote=this._data;
    }
    deleteNote(){
        console.log(notesData);
        const noteIndex = notesData.findIndex(note => note.id === this._data.id);
        if (noteIndex !== -1) {
            notesData.splice(noteIndex, 1);
        }
        this.showData();
    }
    showData(){
        const containerList=document.querySelector('#container-list');
        document.querySelector('notes-list').remove();
        document.querySelector('#form-container').classList.add('d-none');
        containerList.classList.remove('d-none')
        document.querySelector('#container-detail').classList.remove('d-none')
        document.querySelector('main').style.gridTemplateColumns="1fr 1fr"
        let noteDetail = document.querySelector('note-detail');
        if (noteDetail) {
            noteDetail.remove();
        }
        document.querySelector('#message').classList.remove('d-none');
        // Show List
        const notes = notesData.slice(); 
        notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const showData=notes.map((note)=>{
            const noteItem=document.createElement('note-item');
            noteItem.note=note;
            return noteItem;
        });
        containerList.append(document.createElement('notes-list'));
        const notesList=document.querySelector('notes-list');
        notesList.append(...showData);
    }
    render(){
        this._updateStyle();
        this.shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML+=`
        <div class="btn-list d-none" id="btn-container">
            <button class="back">Back</button>
            <button class="edit">Edit Note</button>
            <button class="delete">Delete Note</button>
        </div>
        <div class='detail'>
            <h1>${this._data.title}</h1>
            <p>CreatedAt: ${new Date(this._data.createdAt)}</p>
            <pre>${this._data.body}</pre>
        </div>
        `
        this._shadowRoot.querySelector('.edit').addEventListener('click',()=>{
            this.editNote();
        })
        this._shadowRoot.querySelector('.delete').addEventListener('click',()=>{
            this.deleteNote();
        })
        this._shadowRoot.querySelector('.back').addEventListener('click',()=>{
            document.querySelector('#container-detail').classList.toggle('active');
            document.querySelector('#container-list').classList.toggle('active');
            document.querySelector('#container-detail').classList.toggle('not-active');
            document.querySelector('#container-list').classList.toggle('not-active');
        })
    }
}
customElements.define('note-detail',NoteDetail)