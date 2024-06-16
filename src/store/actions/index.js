export const ACTION_TYPES = {
  SET_TODO: 'SET_TODO',
  SET_IS_TODO_ITEM_EDITED: 'SET_IS_TODO_ITEM_EDITED',
  CLEAR_ALL: 'CLEAR_ALL',
};

export const setTodo = (payload) => ({
  type: ACTION_TYPES.SET_TODO,
  payload,
});

export const setIsTodoItemEdited = (payload) => ({
  type: ACTION_TYPES.SET_IS_TODO_ITEM_EDITED,
  payload,
});

export const clearAll = () => ({
  type: ACTION_TYPES.CLEAR_ALL,
});
