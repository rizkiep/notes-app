import {notesData} from './data/notes.js';
import './components/notes-list.js';
import './components/note-item.js';
import './components/note-detail.js'
import './components/form-note.js'

document.addEventListener('DOMContentLoaded',() =>{
    const notesList= document.querySelector('notes-list');
    const containerList=document.querySelector('#container-list');

    // Show All Note
    const showNotes=(data)=>{
        const notes = data.slice(); 
        notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const showData=notes.map((note)=>{
            const noteItem=document.createElement('note-item');
            noteItem.note=note;
            return noteItem;
        });
        notesList.append(...showData);
    };
    showNotes(notesData);
    // Button Create
    document.querySelector('#create').addEventListener('click',()=>{
        document.querySelector('main').style.gridTemplateColumns="1fr";
        document.querySelector('#form-container').classList.remove('d-none');
        document.querySelector('#container-list').classList.add('d-none')
        document.querySelector('#container-detail').classList.add('d-none')
    })
});