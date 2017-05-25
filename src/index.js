import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reducers from './reducers';
import ResourcesIndex from './components/resources_index';
import ResourceNew from './components/resource_new';
import ResourceShow from './components/resource_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
       <div>
         <Switch>
          <Route path="/resources/new" component={ResourceNew} />
          <Route path="/resource/:id" component={ResourceShow} />
          <Route path="/" component={ResourcesIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
