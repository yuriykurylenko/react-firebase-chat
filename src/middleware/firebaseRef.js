import { isEmpty, isFunction } from 'lodash';

class FirebaseRef {
  constructor(db, path) {
    this.ref = db.ref(path);
  }

  fetch = callback => {
    this.ref.on('value', snapshot => {
      let value = snapshot.val();

      if (!isEmpty(value) && isFunction(callback)) {
        callback(value);
      }
    });
  }

  setIfNotExists = data => {
    this.ref.on('value', snapshot => {
      let value = snapshot.val();

      if (isEmpty(value)) {
        this.ref.set(data);
      }
    });
  }

  set = value => this.ref.set(value);
  push = value => this.ref.push().set(value);
}

export default FirebaseRef;
