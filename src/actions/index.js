
import firebase from '../firebase';

export const addMessage = (msg) => ({
    type: 'ADD_MESSAGE',
    ...msg
});

export const sendMessage = (text, user) => {
    return function (dispatch) {
        let msg = {
                text: text,
                time: Date.now(),
                author: {
                    name: user.name,
                    avatar: user.avatar
                }
            };

        const newMsgRef = firebase.database()
                                  .ref('messages')
                                  .push();
        msg.id = newMsgRef.key;
        newMsgRef.set(msg);

        dispatch(addMessage(msg));
    };
};

export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
    receivedAt: Date.now()
});

export const fetchMessages = () => {
    return function (dispatch) {
        dispatch(startFetchingMessages());
        firebase.database()
                .ref('messages')
                .orderByKey()
                .limitToLast(20)
                .on('value', (snapshot) => {
                    // gets around Redux panicking about actions in reducers
                    setTimeout(() => {
                        const messages = snapshot.val() || [];
                        dispatch(receiveMessages(messages))
                    }, 0);
                });
    }
}

export const receiveMessages = (messages) => {
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));

        dispatch(receivedMessages());
    }
}

export const updateMessagesHeight = (event) => {
    const layout = event.nativeEvent.layout;

    return {
        type: 'UPDATE_MESSAGES_HEIGHT',
        height: layout.height
    }
}

export const createNewJournal = (name) => {
  return function(dispatch, getState) {
    const { uid } = getState().user;
    firebase.database().ref('users/' + uid + '/journals').push({name: name });
  }
}
export const loadUserJournalList = () => {
  return function (dispatch, getState) {
    const { uid } = getState().user;

    console.log('fetching user journals');
    dispatch(startFetchingMessages);
    firebase.database()
            .ref('users/'+uid+'/journals')
            .orderByKey()
            .on('value', (snapshot) => {
              console.log(snapshot.val());
              // gets around Redux panicking about actions in reducers
              setTimeout(() => {
                  const messages = snapshot.val() || [];
                  dispatch(receiveMessages(messages))
              }, 0);
            });
  }
}
//
// User actions
//

export const setUserName = (name) => ({
    type: 'SET_USER_NAME',
    name
});

export const setUserAvatar = (avatar) => ({
    type: 'SET_USER_AVATAR',
    avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png'
});

export const setUserEmail = (email) => ({
    type: 'SET_USER_EMAIL',
    email
});

export const setUserPassword = (password) => ({
    type: 'SET_USER_PASSWORD',
    password
});

export const setUserUID = (uid) => ({
    type: 'SET_USER_UID',
    uid
});
export const signUpWithEmailAndPassword = (email, password) => {
  return function(dispatch, getState) {
    console.log(email);
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
}
export const logInWithEmailAndPassword = (email, password) => {
  return function(dispatch, getState) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
      console.log(result);
      if (result.credential) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
      }
      var user = result.user;

      dispatch(setUserEmail(result.email));
      dispatch(setUserName(result.displayName));
      dispatch(setUserAvatar(result.photoURL));
      dispatch(setUserUID(result.uid));
      dispatch(loadUserJournalList());
      dispatch(userAuthorized());
    });
  }
}
export const checkUserExists = () => {
    return function (dispatch) {
        dispatch(startAuthorizing());

        firebase.auth()
                .signInAnonymously()
                .then(() => firebase.database()
                                    .ref(`users/name`)
                                    .once('value', (snapshot) => {
                                        const val = snapshot.val();

                                        if (val === null) {
                                            dispatch(userNoExist());
                                        }else{
                                            dispatch(setUserName(val.name));
                                            dispatch(setUserAvatar(val.avatar));
                                            startChatting(dispatch);
                                        }
                                    }))
                .catch(err => console.log(err))
    }
}

const startChatting = function (dispatch) {
    dispatch(userAuthorized());
    dispatch(fetchMessages());

}

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});
