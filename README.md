# Pinterest

## Description

This application is my attempt at a Pinterest style application.  The user is able to login using their google account.

Once logged in the user is able to add boards to their view of the site.  They are able to then add individual pins to those boards.

If the user decides they can remove a pin that they do not wish the keep any longer.  The user can also remove an entire board and all the pins that it contains.

If the user decides to reorganize and categorize their pins their is an option available on the pin to move the pin to a different board.

If the user clicks on the image of a pin it will take them to the site that was linked in the initial creation of the pin.

## Features

- Utilizes Sass Variables to include different font styles
- ES6 Modules
- jQuery used for selectors and some DOM Manipulation
- Firebase Console used to store application's data collections

## Screenshots
#### Welcome View:
![Welcome-view](https://raw.githubusercontent.com/broach44/pinterest/master/screenshots/welcomeScreen.png)
#### User Home View:
![User-home](https://raw.githubusercontent.com/broach44/pinterest/master/screenshots/userHomeView.png)
#### New Pin Form:
![New-Pin-Form](https://raw.githubusercontent.com/broach44/pinterest/master/screenshots/createNewPinForm.png)
#### New Board Form:
![New-Board-Form](https://raw.githubusercontent.com/broach44/pinterest/master/screenshots/createNewBoard.png)
#### Board Pin View:
![Board-pin-view](https://raw.githubusercontent.com/broach44/pinterest/master/screenshots/boardPinView.png)
#### Board Move Form:
![Move-Pin-Form](https://raw.githubusercontent.com/broach44/pinterest/master/screenshots/movePinView.png)
## How to Run

- Clone down this project
- In the terminal run `npm install`
- Create a firebase project [here](https://console.firebase.google.com/)
- Create `src/helpers/apiKeys.json` file and add in your firebase keys that were created in the new firebase project.  Feel free to reference the `apiKeys.example.json` file in the project for the structure.
- Once set up to run enter the following in the terminal `npm start`

## Demo

[Preview the Project Here](https://pinterest-6d44e.firebaseapp.com)

## Contributors

[Crystal Broach](https://github.com/broach44)
