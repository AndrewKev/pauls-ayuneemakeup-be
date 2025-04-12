import { makeAutoObservable } from 'mobx';

class NewProductStore {
  trigger = '';

  constructor() {
    makeAutoObservable(this);
  }

  setTrigger(newVal) {
    this.trigger = newVal;
  }
}

const newProduct = new NewProductStore();
export default newProduct;