import {action, makeObservable} from 'mobx';
import Note from './Note';

export default class NoteStore {
  constructor() {
    //makeObservable(this);
  }

  //@observable
  notes: Note[] = [];
  //@observable
  counter = 1;

  saveNote(note: Note) {
    const idx = this.notes.findIndex((n) => note.noteId === n.noteId);
    if (idx < 0) {
      this.notes.push(note);
    } else {
      this.notes[idx] = note;
    }
  }

  deleteNote(note: Note) {
    const idx = this.notes.findIndex((n) => n.noteId === note.noteId);
    if (idx < 0) {
      throw new Error(`Note ${note.noteId} not found`);
    } else {
      this.notes.splice(idx, 1);
    }
  }

  getNote(noteId: number): Note {
    const idx = this.notes.findIndex((n) => n.noteId === noteId);
    if (idx < 0) {
      throw new Error(`Note ${noteId} not found`);
    } else {
      return this.notes[idx];
    }
  }

 // @action
  addNote(): void {
    console.log('avvio');
    const note = {
      noteId: Date.now(),
      title: 'sss',
      content: 'ss',
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };

    this.saveNote(note);
    this.counter = this.notes.length;
    console.log(this.notes.length);
  }
}

// export const observableNoteStore = new NoteStore();
//
// const newNote = (title: string, content: string) => {
//   const note = {
//     noteId: uuidv4(),
//     title: title,
//     content: content,
//     updatedAt: Date.now(),
//     createdAt: Date.now(),
//   };
//   observableNoteStore.saveNote(note);
// };
//
// newNote('First Note', 'some content');
// newNote('2nd Note', 'some content');
// newNote('3rd Note', 'some content');
// newNote('4th Note', 'some content');
