import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import JournalUI from './components/ChatUI';
import LoginUI from './components/LoginUI';
import SignUp from './components/SignUp';
import rootReducer from './reducers';
import { fetchMessages, checkUserExists } from './actions';


const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        //loggerMiddleware
    )
);
store.subscribe(()=>{
  // console.log("store changed", store.getState())
});


const LoginOrChat = connect(
    (state) => ({
        authorized: state.user.authorized,
        subscribing: state.user.subscribing
    })
)(({ authorized, subscribing, dispatch }) => {
    dispatch(checkUserExists())
    if (authorized) {
        return (<JournalUI />);
    }else{
        if(subscribing){
          return <SignUp />
        } else return (<LoginUI />);
    }
});

class App extends Component {
    constructor(props){
      super(props)

    }
    render() {
        return (
            <Provider store={store}>
               <LoginOrChat />
            </Provider>
        );
    }
}
export default App;
