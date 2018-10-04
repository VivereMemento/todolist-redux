import { combineReducers } from 'redux';
// import { createSelector } from 'reselect';

import { getFilterFunc, filterList, get } from './helpers';
import {
  action,
  createReducer,
  mergePayload,
  lookupReducer,
  include,
  domainSelector,
} from '../redux-utils';


const _toggleTodo = action('TODO::TOGGLE');
export const toggleTodo = id => _toggleTodo({ id });
const _deleteTodo = action('TODO::DELETE');
export const deleteTodo = id => _deleteTodo({ id });
export const saveTodo = action('TODO::SAVE');
export const setFilter = action('TODO::SET-FILTER');
const _addTodo = action('TODO::ADD');
export const addTodo = name => _addTodo(name);


const initialTodoState = {
  id: null,
  name: '',
  completed: false,
}

const todo = createReducer(initialTodoState, {
  [_toggleTodo.type]: state => {
    console.log('this is _toggleTodo', state);
    return {
      ...state, completed: !state.completed,
    }
  },
  [_deleteTodo.type]: state => {

    return {
      ...state, deleted: !state.deleted,
    }
  },
  [saveTodo.type]: mergePayload,
  [_addTodo.type]: mergePayload,
});

const todoLookup = lookupReducer(todo);

const byId = createReducer({}, {
  [_addTodo.type]: todoLookup,
  [_toggleTodo.type]: todoLookup,
  [_deleteTodo.type]: todoLookup,
  [saveTodo.type]: todoLookup,
});

const ids = createReducer([], {
  [saveTodo.type]: (state, { payload} ) => include(state, payload.id),
  [_addTodo.type]: (state, { payload} ) => include(state, payload.id),
});

const filter = createReducer('all', {
  [setFilter.type]: (_, { payload }) => {
    console.log('this is filter', payload);
    return payload;
  },
});

const todos = combineReducers({ byId, ids, filter });

export default todos;

// ------- SELECTORS --------
const createSelector = (...selectors) => {
  const selector = selectors.pop();
  return (...args) => selector(
    ...selectors.map(s => s(...args))
  );
}

export const domain = domainSelector(
  state => {
    console.log('this is domain', state.todos);
    return state.todos;
  }
);

export const getTodos = createSelector(
  domain, ({ ids, byId }) => {
    console.log('this getTodos')
    return ids.map(id => byId[id]);
  }
);

export const getFilterValue = createSelector(
  domain, get('filter')
);

export const getFilter = createSelector(
  getFilterValue, getFilterFunc
);

export const getVisibleTodos = createSelector(
  getTodos, getFilter, filterList
);