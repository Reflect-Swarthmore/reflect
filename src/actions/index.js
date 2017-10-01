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
export const createNewUser = () => {
  return function (dispatch){
    dispatch(startSubscribing());
  }
};
export const subscribeNewUser = (name, lastname, email, password) => {
  return function (dispatch, getState){
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
        dispatch(setUserEmail(user.email));
        dispatch(setUserName(user.displayName));
        dispatch(setUserUID(user.uid));
        dispatch(loadUserJournalList());
        dispatch(userAuthorized());
    })
    .catch(function(error) {
      dispatch(userErrorMessage(error.message));
    });
  }
};
//
// User actions
//
export const startSubscribing = () => ({
  type: 'USER_START_SUBSCRIBING'
});
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
export const signUpWithEmailAndPassword = (name, lastname, email, password) => {
  return function(dispatch, getState) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
        dispatch(setUserEmail(user.email));
        dispatch(setUserName(user.displayName));
        dispatch(setUserAvatar(user.photoURL));
        dispatch(setUserUID(user.uid));
        dispatch(loadUserJournalList());
        dispatch(userAuthorized());
    })
    .catch(function(error) {
      dispatch(userErrorMessage(error.message));
    });
  }
}
export const logInWithEmailAndPassword = (email, password) => {
  return function(dispatch, getState) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
      //save token in local Storage
      dispatch(setUserEmail(result.email));
      dispatch(setUserName(result.displayName));
      dispatch(setUserAvatar(result.photoURL));
      dispatch(setUserUID(result.uid));
      dispatch(loadUserJournalList());
      dispatch(userAuthorized());
    }).catch(function(error){
      dispatch(userErrorMessage(error.message));
    });

  });

  }
}
export const userErrorMessage = (code) => ({
    type: 'USER_ERROR_MESSAGE',
    code
});
export const checkUserExists = () => {
    return function (dispatch) {
        console.log("made it here");
        var user = firebase.auth().onAuthStateChanged(function(user){

          console.log(user);
          if(user){
            // user signed in
            dispatch(setUserEmail(user.email));
            dispatch(setUserName(user.displayName));
            dispatch(setUserAvatar(user.photoURL));
            dispatch(setUserUID(user.uid));
            dispatch(loadUserJournalList());
            dispatch(userAuthorized());
            console.log(user);
          }
          else{
            // user not signed in
          }
        })
    }
};

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
