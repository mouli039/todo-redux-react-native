import {ADD_TODO, CHECKED_TODO, DELETE_SELECTED_TODO, DELETE_TODO, EDIT_TODO} from './types';

export const addTask = (task:string) => {
  return {
    type: ADD_TODO,
    payload:{
        task:task,
        id:Date.now(),
        checked:false
    }
  };
};

export const deleteTask = (id:any) => {
    return {
      type: DELETE_TODO,
      payload:{
          id:id
      }
    };
  };

export const editTask = (id:any,task:string) => {
    return {
      type: EDIT_TODO,
      payload:{
          id:id,
          task:task
      }
    };
  };

  export const checkedTask = (id:any) => {
    return {
      type: CHECKED_TODO,
      payload:{
          id:id,
      }
    };
  };

  export const deleteSelected = (list:any) => {
    return {
      type: DELETE_SELECTED_TODO,
      payload:{
          list:list,
      }
    };
  };