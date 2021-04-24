import React from 'react'
import { TodosContextProvider } from './TodoComps/TodoContext/TodoContext';
import { TodosAddForm } from './TodoComps/TodosAddForm';
import { TodosHeader } from './TodoComps/TodosHeader';
import { TodosList } from './TodoComps/TodosList';

export interface TodosProps {

}

export const Todos: React.FC<TodosProps> = ({ }) => {
  return (
    <TodosContextProvider>
      <TodosHeader />
      <TodosAddForm />
      <TodosList />
    </TodosContextProvider>
  );
}