import * as firebase from 'firebase';

export class AuthService {
  token: string;

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
    ;
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log(response);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        error => {
          this.token = null;
          console.log(error);
        }
      )
    ;
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
        });
    return this.token;
  }

  isAuthorized(): boolean {
    return this.token != null;
  }
}
