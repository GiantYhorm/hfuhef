import React, { Component } from 'react'
import { View, Text,AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './src/reducers/index'
import firebase from 'firebase'
import Router from './src/Router'
import ReduxThunk from 'redux-thunk'


export default class App extends React.Component {
    componentWillMount(){
        let config = {
       apiKey: "AIzaSyB8VUC3Dtqqe82P3rL1uTUL3kDEy6j5_ew",
    authDomain: "manager-dff20.firebaseapp.com",
    databaseURL: "https://manager-dff20.firebaseio.com",
    projectId: "manager-dff20",
    storageBucket: "manager-dff20.appspot.com",
    messagingSenderId: "856048104872"

        };
        firebase.initializeApp(config)
    }
  render() {
    const store = createStore(reducer, {}, applyMiddleware(ReduxThunk))
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
  }
}

AppRegistry.registerComponent('fifth', () => App);
