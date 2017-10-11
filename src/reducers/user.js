
const initialState = {
    name: null,
    email: null,
    password: null,
    uid: null,
    avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
    authorizing: false,
    authorized: false,
    subscribing: false,
    error: null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_NAME':
            return Object.assign({}, state, {
                name: action.name
            });
        case 'SET_USER_AVATAR':
            return Object.assign({}, state, {
                avatar: action.avatar
            });
      case 'SET_USER_EMAIL':
          return Object.assign({}, state, {
              email: action.email
          });
      case 'SET_USER_PASSWORD':
          return Object.assign({}, state, {
            name: action.name
        });
      case 'SET_USER_UID':
        return Object.assign({}, state, {
          uid: action.uid
      });
      case 'USER_START_AUTHORIZING':
          return Object.assign({}, state, {
              authorizing: true
          });
      case 'USER_AUTHORIZED':
          return Object.assign({}, state, {
              authorizing: false,
              authorized: true
          });
      case 'USER_NO_EXIST':
          return Object.assign({}, state, {
              authorizing: false,
              authorized: false
          });
      case 'USER_START_SUBSCRIBING':
        return Object.assign({}, state, {
          subscribing: true
        });
      case 'USER_ERROR_MESSAGE':
        return Object.assign({}, state, {
          error: action.code
        });
      case 'USER_SIGN_OUT':
        return Object.assign({}, state, {
          authorized: false
        });
        default:
            return state
    }
}

export default user;
