import {action, computed, makeObservable, observable} from 'mobx';
import Note from './Note';
import AccountRepository from '../repositories/account-repository';

export default class AccountStore {
  constructor(accountRepository: AccountRepository) {

    this.accountRepository = accountRepository;
    this.remoteUrl = '10.0.0.2';
    console.log('>>>>>>>>>>>>>>>>');

    makeObservable(this, {
      remoteUrl: observable,
      remoteUrlRead: computed,
      updateRemote: action
    });

    //makeAutoObservable(this);
  }


  updateRemote() {
    this.accountRepository.refreshRemoteConfig().then(action(value => {
      console.log('CAZZO', value);
      this.remoteUrl = value
    }));
  }

  async login(username: string, password: string): Promise<string> {
    return this.accountRepository.login(username, password);
  }

  remoteUrl = '';

  accountRepository: AccountRepository;

  get remoteUrlRead(): string {
    return this.remoteUrl;
  }

  notes: Note[] = [];
  counter = 0;

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
