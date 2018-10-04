import React from 'react';

const ToDoItem = ({ id, name, completed, deleted, onClick, onDelete }) => (
  <li className="list-group-item">
    <div className="form-check" style={{display: 'flex', justifyContent: 'space-between'}}>
      <input
        type="checkbox"
        className="form-check-input"
        id={`checkbox-${id}`}
        onChange={onClick}
        checked={completed}
      />
      <label className="form-check-label" htmlFor={`checkbox-${id}`}>
        {name}
      </label>
      <button onClick={ onDelete }>{ deleted ? "Add" : "Delete" }</button>
    </div>
  </li>
);

export default ToDoItem;
