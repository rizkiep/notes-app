import {notesData} from '../data/notes.js';
class FormNote extends HTMLElement{
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
        this.render();
    }
    _updateStyle(){
        this._style.textContent=`
        form{
            display: flex;
            flex-direction: column;
        }
        .form-group{
            display: flex;
            flex-direction: column;
        }
        label{
            margin-bottom: 5px;
            font-size: 16px;
        }
        .input-title{
            height: 40px;
            border-radius: 10px;
            border: 1px solid black;
            padding: 0 10px;
            font-size: 16px;
            margin-bottom: 0;
        }
        .input-body{
            border-radius: 10px;
            height: 40vh;
            border: 1px solid black;
            padding: 10px 10px;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .btn-group{
            display: flex;
            width: 50vw;
            justify-content: space-around;
        }
        .btn-cancel{
            background-color: red;
            border: none;
            border-radius: 24px;
            width: 45%;
            height: 40px;
            color:white;
            font-size: 16px;
            cursor: pointer;
        }
        .btn-save{
            background-color: var(--blue);
            border: none;
            border-radius: 24px;
            width: 45%;
            height: 40px;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }
        .required-form{
            color:red;
            font-size:14px;
        }
        .validation-message {
            margin-block-start: 0.5rem;
            color: red;
            margin-top: 0;
            margin-bottom: 5px;
        }
        `
    }
    saveForm(){
        console.log('1');
        this._note.title=this._shadowRoot.querySelector('#title').value;
        this._note.body=this._shadowRoot.querySelector('#body').value;
        this._note.createdAt=new Date().toISOString();
        if(this._note.id!=null){
            console.log('2');
            const update=notesData.filter(note => note.id===this._note.id);
            update.title=this._note.title;
            update.body=this._note.body;
            update.createdAt=this._note.createdAt;
        }
        else{
            console.log('3');
            this._note.id='notes-'+new Date().getUTCMilliseconds();
            this._note.archived=false;
            notesData.push(this._note);
        }
        this.resetNote()
        this.BackToList()
    }
    resetNote(){
        this._note = {
            id: null,
            title: null,
            body: null,
            createdAt: null,
            archived: null,
        };
        this._shadowRoot.querySelector('#title').value = '';
        this._shadowRoot.querySelector('#body').value = '';
    }
    BackToList(){
        const containerList=document.querySelector('#container-list');
        document.querySelector('notes-list').remove();
        document.querySelector('#form-container').classList.add('d-none');
        containerList.classList.remove('d-none')
        document.querySelector('#container-detail').classList.remove('d-none');
        if(window.innerWidth>991){
            document.querySelector('main').style.gridTemplateColumns="1fr 1fr"
        }
        let noteDetail = document.querySelector('note-detail');
        if (noteDetail) {
            noteDetail.remove();
        }
        document.querySelector('#container-detail').classList.remove('active');
        document.querySelector('#container-list').classList.add('active');
        document.querySelector('#container-detail').classList.add('not-active');
        document.querySelector('#container-list').classList.remove('not-active');
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
    set formNote(value){
        this._note=value;
        this.render();
        this.editForm();
    }
    editForm(){
        this._shadowRoot.querySelector('#title').value=this._note.title;
        this._shadowRoot.querySelector('#body').value=this._note.body;
    }
    render(){
        this.shadowRoot.innerHTML=''
        this._updateStyle();
        this.shadowRoot.appendChild(this._style);
        this.shadowRoot.innerHTML+=`
        <form action="">
                <div class="form-group">
                    <label class="label-title" for="title">Title : <span class='required-form'>*</span></label>
                    <input class="input-title" type="text" name="title" id="title" required>
                    <p id="titleValidation" class="validation-message" aria-live="polite"></p>
                </div>
                <div class="form-group">
                    <label class="iabel-body" for="body">Body :</label>
                    <textarea class="input-body" name="body" id="body"></textarea>
                </div>
                <div class="btn-group">
                    <button class="btn-cancel" id="btn-cancel">Cancel</button>
                    <button class="btn-save" id="btn-save">Save Note</button>
                </div>
            </form>
        `
        this._shadowRoot.querySelector('#btn-cancel').addEventListener('click',(e)=>{
            e.preventDefault();
            this.BackToList();
        })
        this._shadowRoot.querySelector('form').addEventListener('submit',(e)=>{
            e.preventDefault();
            this.saveForm();
        });
        this._shadowRoot.querySelector('#title').addEventListener('blur',(e)=>{
            const validationEl=this._shadowRoot.getElementById('titleValidation')
            if (!e.target.validity.valid) {
                validationEl.innerText = 'Title is required';
              } else {
                validationEl.innerText = '';
              }
        })
        this._shadowRoot.querySelector('#title').addEventListener('invalid', (e) => {
            e.target.setCustomValidity('');
            if (!e.target.validity.valid) {
              e.target.setCustomValidity('Title is required');
              return;
            }
        });
    }
}
customElements.define('form-note', FormNote);