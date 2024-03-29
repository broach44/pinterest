import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';
import userHome from '../../components/UserHome/userHome';

const authDiv = $('#auth');
const logoutButton = $('#navbar-button-logout');
const myBoards = $('#boardDiv');
const userPinArea = $('#userPinDiv');
const mainPinterest = $('#pinterestTitle');
const addContentDiv = $('#addContentDiv');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // if someone is logged in what should happen
      authDiv.addClass('hide');
      logoutButton.removeClass('hide');
      mainPinterest.addClass('hide');
      myBoards.removeClass('hide');
      userPinArea.addClass('hide');
      addContentDiv.removeClass('hide');
      const userId = user.uid;
      userHome.buildUserBoards(userId);
    } else {
      // what should happen if not logged in
      authDiv.removeClass('hide');
      logoutButton.addClass('hide');
      mainPinterest.removeClass('hide');
      myBoards.addClass('hide');
      userPinArea.addClass('hide');
      addContentDiv.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
