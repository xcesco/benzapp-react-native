import AccountRepository from '../repositories/account-repository';
import AccountStore from './account-store';
import NoteStore from './note-store';

export class RootStore {
  constructor() {
    //makeObservable(this);

    const accountRepository = new AccountRepository();

    this.accountStore = new AccountStore(accountRepository);
    this.noteStore = new NoteStore();
    ;
  }

  readonly accountStore: AccountStore;
  readonly noteStore: NoteStore;

}
