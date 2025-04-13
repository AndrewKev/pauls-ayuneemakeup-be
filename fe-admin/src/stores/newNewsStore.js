import { makeAutoObservable } from 'mobx';

class newNewsStore {
  trigger = '';

  constructor() {
    makeAutoObservable(this);
  }

  setTrigger(newVal) {
    this.trigger = newVal;
  }
}

const newNews = new newNewsStore();
export default newNews;