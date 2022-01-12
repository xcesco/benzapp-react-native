import AccountRepository from '../repositories/account-repository';
import NoteStore from './note-store';

export class RootStore {
  constructor(accountRepository: AccountRepository) {
    //makeObservable(this);

    this.noteStore = new NoteStore();
  }

  readonly noteStore: NoteStore;

}
