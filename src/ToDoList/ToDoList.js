import React from 'react';
import { connect } from 'react-redux';
import ToDoItem from './ToDoItem';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  getVisibleTodos as getTodos,
  getFilterValue,
} from './store';

const ToDoList = ({ todos, onTodoAdd, onTodoClick, onTodoDelete, filter, onFilterChange }) => (
  <div className="container">
    <div className="row">
      <div className="col-sm-4">
        <select className="form-control" value={filter} onChange={onFilterChange}>
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="not-completed">not completed</option>
          <option value="deleted">deleted</option>
        </select>
      </div>
    </div>
    <hr/>
    <div className="row">
      <div className="col-md-12">
        <ul className="list-group">
          {todos.map && todos.map (
            todo => (
              <ToDoItem
                key={todo.id}
                {...todo}
                onClick={() => onTodoClick(todo.id)}
                onDelete={ () => onTodoDelete(todo.id)}
              />
            )
          )}
        </ul>
        <hr/>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <input className="form-control" type="text" placeholder="New Task" ref={
            node => { this.input = node }
          }/>
          <button onClick={ onTodoAdd }>Add</button>
        </div>
      </div>
    </div>
  </div>
);

const state2Props = state => ({
  todos: getTodos(state),
  filter: getFilterValue(state),
});

const handlers = {
  onTodoAdd: () => addTodo({ name: this.input.value }),
  onTodoClick: id => toggleTodo(id),
  onTodoDelete: id => deleteTodo(id),
  onFilterChange: ({ target }) => setFilter(target.value),
}

export default connect(state2Props, handlers)(ToDoList);