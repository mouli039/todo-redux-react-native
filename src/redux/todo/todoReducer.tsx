import {
  ADD_TODO,
  CHECKED_TODO,
  DELETE_SELECTED_TODO,
  DELETE_TODO,
  EDIT_TODO,
} from './types';

const initialState: {todo: any} = {
  todo: [],
};

const todoReducer = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todo: state.todo.filter(
          (ele: {id: any}) => ele.id !== action.payload.id,
        ),
      };
    case EDIT_TODO:
      return {
        ...state,
        todo: state.todo.map((ele: any) =>
          ele.id === action.payload.id
            ? {...ele, task: action.payload.task}
            : ele,
        ),
      };
    case CHECKED_TODO:
      return {
        ...state,
        todo: state.todo.map((ele: any) =>
          ele.id === action.payload.id ? {...ele, checked: !ele.checked} : ele,
        ),
      };
    case DELETE_SELECTED_TODO:
      return {
        ...state,
        todo: state.todo.filter(
          (ele: any) => !action.payload.list.includes(ele.id),
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
