import React from 'react'
import { TODO_ACTIONS } from './TodoDefinitions'

export const TodoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.ADD:
      return [...state, {
        id: Math.random(),
        text: action.todo.text,
        completed: false
      }];
    case TODO_ACTIONS.TOGGLE:
      return state.map(todo => {
        if (todo.id === action.todo.id) {
          return {
            id: todo.id,
            text: todo.text,
            completed: !todo.completed
          };
        }
        
        return todo;
      });
    default:
      return state;
  }
}