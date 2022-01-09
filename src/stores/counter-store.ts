// counter.store.js
import {action, makeObservable, observable} from 'mobx';

export class CounterStore {
  @observable count = 0;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  increment() {
    this.count += 1;
  }

  @action.bound
  decrement() {
    this.count -= 1;
  }
}


