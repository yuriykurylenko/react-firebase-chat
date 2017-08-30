import { LOCALSTORAGE_USER_KEY } from './constants';

class LocalstorageMiddleware {
  static getUserData() {
    const userDataText = localStorage.getItem(LOCALSTORAGE_USER_KEY);

    if (userDataText) {
      const fbUserData = JSON.parse(userDataText);
      return {
        uid: fbUserData.uid,
        name: fbUserData.displayName,
        photoURL : fbUserData.photoURL
      };
    }
  }

  static deleteUserData() {
    localStorage.removeItem(LOCALSTORAGE_USER_KEY);
  }
}

export default LocalstorageMiddleware;
