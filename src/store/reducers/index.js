import { ACTION_TYPES } from '../actions';
import { INITIAL_STATE } from '../state';

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TODO: {
      return {
        ...state,
        todos: state.todos.length
          ? state.todos.map((todo) =>
              todo.id === action.payload.id
                ? { ...todo, ...action.payload }
                : todo,
            )
          : action.payload,
      };
    }
    case ACTION_TYPES.SET_IS_TODO_ITEM_EDITED: {
      return { ...state, isTodoItemEdited: action.payload };
    }
    case ACTION_TYPES.CLEAR_ALL: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
