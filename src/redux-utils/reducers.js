export const mergePayload = (state, { payload }) => {
  console.log('this is mergePayload', state, payload);
  return {
    ...state, ...payload,
  }
};

const callReducer = (reducer, state, action) => (
  typeof reducer === 'function'
    ? reducer(state, action)
    : state
);

export const createReducer = (intialState, reducers) => (
  (state = intialState, action) => callReducer(
    reducers[action.type], state, action
  )
);

const defaultGetId = ({ payload }) => payload.id;
const generateId = (action) => {
  console.log('this is generateId');
  action.payload.id = Math.floor(Date.now() + Math.random() * 1000);
  return action;
}

export const lookupReducer = (reducer, idSelector = defaultGetId) => (
  (state, action) => {
    let id = idSelector(action);

    if (id == null) {
      id = idSelector(generateId(action));
    };
    console.log('this is lookupReducer', state, action);

    return ({
      ...state,
      [id]: reducer(state[id], action),
    })
  }
);

export const include = (list, item) => {
  console.log('this is include', list, item);
  return !Array.isArray(list) ? [item] :
          !list.includes(item) ? [...list, item] :
          list
}

export const exclude = (list, item) => {
  if (!Array.isArray(list)) return [];
  const index = list.indexOf(item);
  if (index < 0) return list;
  return list.slice(0, index).concat(
    list.slice(index + 1)
  );
}