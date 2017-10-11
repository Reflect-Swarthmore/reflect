import firebase from '../firebase';

export const login = (token) => {
  return function(dispatch){

  }
}
export const signout = () => {
  return function(dispatch){
    firebase.auth().signOut().then(function(promise){
      dispatch(signoutUser());
    });
  }
}
export const signoutUser = () => ({
  type: 'USER_SIGN_OUT'
});
