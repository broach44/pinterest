import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

// const authDiv = $('#auth');
const logoutButton = $('#navbar-button-logout');

const logoutEvent = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        console.log('logged out successfully');
        logoutButton.addClass('hide');
      }).catch((err) => console.error('you are still logged in', err));
  });
};

export default { logoutEvent };
