import {action, makeObservable, observable} from 'mobx';
import Note from './Note';
import AccountRepository from '../repositories/account-repository';

export default class AccountStore {
  constructor(accountRepository: AccountRepository) {
    makeObservable(this);
    this.accountRepository = accountRepository;
  }

  accountRepository: AccountRepository;

  @observable notes: Note[] = [];
  @observable counter = 0;

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

  @action
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
