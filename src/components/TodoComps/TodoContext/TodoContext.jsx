import React, { createContext, useEffect, useReducer } from 'react';
import { TodoReducer } from './TodoReducer';

export const TodosContext = createContext();

export const TodosContextProvider = (props) => {
  const [todos, dispatch] = useReducer(TodoReducer, [], () => {
    const todosFromStorage = localStorage.getItem('todos');
    return todosFromStorage ? JSON.parse(todosFromStorage) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {props.children}
    </TodosContext.Provider>
  );
};
