import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser'))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};

function login(username, password) {
  return fetch(`api/auth/login`, {
    method: 'post',
    body: JSON.stringify({ username, password }),
  })
    .then((user) => {
      if (!user) throw { message: 'Invalid username or password' };

      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      currentUserSubject.next(user);

      return user;
    })
    .catch((error) => {
      throw error;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}
