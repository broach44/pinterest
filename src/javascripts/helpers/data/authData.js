import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const notifySignedIn = $('#checkSignIn');
const authDiv = $('#auth');
const logoutButton = $('#navbar-button-logout');
const myBoards = $('#boardDiv');
const mainPinterest = $('#pinterestTitle');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // if someone is logged in what should happen
      notifySignedIn.removeClass('hide');
      authDiv.addClass('hide');
      logoutButton.removeClass('hide');
      mainPinterest.addClass('hide');
      myBoards.removeClass('hide');
    } else {
      // what should happen if not logged in
      notifySignedIn.addClass('hide');
      authDiv.removeClass('hide');
      logoutButton.addClass('hide');
      mainPinterest.removeClass('hide');
      myBoards.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
