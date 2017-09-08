
import * as firebase from 'firebase';

// should go in a secret file
const config = {
	apiKey: "AIzaSyDGqvUz6xt3ZkDhHFk85rMIu7bQI_JLW4A",
	authDomain: "journal-ed5a3.firebaseapp.com",
	databaseURL: "https://journal-ed5a3.firebaseio.com",
	projectId: "journal-ed5a3",
	storageBucket: "journal-ed5a3.appspot.com",
	messagingSenderId: "295577169635"
};
firebase.initializeApp(config);

export default firebase;
