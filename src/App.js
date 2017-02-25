import './App.css';
import React, { Component } from 'react';
import createSagaMiddleware from 'redux-saga'
import reducers from './redux/modules'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux'
import mySaga from './sagas'
import Works from './Containers/WorksContainer.js'

const sagaMiddleware =  createSagaMiddleware()
const middleWare = [sagaMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(...middleWare)))

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Provider store={store} >
          <Works />
        </Provider>
      </div>
    );
  }
}

sagaMiddleware.run(mySaga)
export default App;
