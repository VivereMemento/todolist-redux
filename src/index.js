import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import todos from './todos';

import ToDoList from './ToDoList'
import { store } from './store';
import { initTodos } from './init';

initTodos(store);

const App = () => (
  <div className="container">
    <div className="row">
      <h1>Todo List</h1>
    </div>
    <hr/>
    <ToDoList />
  </div>
);

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  rootElement
);
