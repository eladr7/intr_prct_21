import React, { useContext } from 'react'
import { TodosContext } from './TodoContext/TodoContext';
import { Todo } from './TodoContext/TodoDefinitions';

export interface TodosHeaderProps {

}

export const TodosHeader: React.FC<TodosHeaderProps> = ({ }) => {
  const { todos } = useContext(TodosContext);
  const remaining = todos.reduce((count: number, todo: Todo) => todo.completed ? count : count + 1, 0);
  return (
    <div>
      <h1>Your tasks:</h1>
      <h2>{remaining} out of {todos.length} todos remain to complete</h2>
    </div>
  );
}