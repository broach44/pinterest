import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import userHome from '../UserHome/userHome';
import utilities from '../../helpers/utilities';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
  userHome.buildUserBoards();
};

const loginButton = () => {
  const domString = `<button class="btn btn-secondary" id="google-auth">
  Login</button>
  `;
  utilities.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
