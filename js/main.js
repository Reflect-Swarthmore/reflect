import React from 'react';
import ReactDOM from 'react-dom';

import BodyTextEditor from './textEditor.jsx';
import Sidebar from './sidebarMenu.jsx';

import { Grid } from 'semantic-ui-react'

class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

  }
  render(){
      return (
        <div style={styles.root}>
          <Grid columns='equal' style={styles.grid}>
              <Grid.Column>
                <Sidebar />
              </Grid.Column>
              <Grid.Column width={9} style={styles.middle}>
                <h1> reflect </h1>
                <BodyTextEditor />
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
          </Grid>
        </div>
      )
  }
}
const styles = {
  grid: {
    height: '100%'
  },
  root: {
    height: '100%',
    backgroundImage: 'url(../images/mountains.png)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center fixed',
    backgroundSize: 'cover',
  },
  middle: {
    textAlign: 'center'
  }
};

ReactDOM.render(
  <Layout />,
  document.getElementById('root')
);

/******************************************************************************
//
//          FIREBASE
//
/******************************************************************************/
var config = {
	apiKey: "AIzaSyDGqvUz6xt3ZkDhHFk85rMIu7bQI_JLW4A",
	authDomain: "journal-ed5a3.firebaseapp.com",
	databaseURL: "https://journal-ed5a3.firebaseio.com",
	projectId: "journal-ed5a3",
	storageBucket: "journal-ed5a3.appspot.com",
	messagingSenderId: "295577169635"
};
firebase.initializeApp(config);

var hasDraft;
function initApp() {

  function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ',' + ' ' + year;
  // return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  // Listen for auth state changes.
  var date = new Date();
  // document.getElementById('date').innerHTML = date.toDateString();
  document.getElementById('date').innerHTML = formatDate(date)

  hasDraft = false;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      document.getElementById('login').style.display = "none";
      // document.getElementById('journal-entry').setAttribute("class", "collapse in");
      welcomeScene(displayName);
      firebase.database().ref('users/' + user.uid + '/draft/').once('value')
        .then(function(snapshot){
          var activeDraft = snapshot.child("isActive").val();
          var journal = snapshot.child("journal").val();
          if (activeDraft == true){
            document.getElementById('draft').textContent = "Open draft";
            hasDraft = true;
          }
        });
    } else {
      // Let's try to get a Google auth token programmatically.
      document.getElementById('login').style.display = "inherit";
      document.getElementById('login').textContent = 'Sign-in with Google';
      document.getElementById('welcome-msg').textContent = '';
      document.getElementById('welcome-usr').textContent = '';

      document.getElementById('journal-entry').setAttribute("class", "collapse");
    }
    document.getElementById('login').disabled = false;
  });
  document.getElementById('login').addEventListener('click', startSignIn, false);
}
/**
  starts the logout process
 */
 // document.getElementById('logout').addEventListener("click", function(){
 //   firebase.auth().signOut();
 // });
/**
 * Starts the sign-in process.
 */
function startSignIn() {
  document.getElementById('login').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    startAuth(true);
  }
}
/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
   // Request an OAuth token from the Chrome Identity API.
   chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
     if (chrome.runtime.lastError && !interactive) {
       console.log('It was not possible to get a token programmatically.');
     } else if(chrome.runtime.lastError) {
       console.error(chrome.runtime.lastError);
     } else if (token) {
       // Authrorize Firebase with the OAuth Access Token.
       var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
       firebase.auth().signInWithCredential(credential).catch(function(error) {
         // The OAuth token might have been invalidated. Lets' remove it from cache.
         if (error.code === 'auth/invalid-credential') {
           chrome.identity.removeCachedAuthToken({token: token}, function() {
             startAuth(interactive);
           });
         }
       });
     } else {
       console.error('The OAuth Token was null');
     }
   });
 }
 window.onload = function() {
  initApp();
};
