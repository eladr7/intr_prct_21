import React from 'react'
import { Todo } from './TodoContext/TodoDefinitions';

export interface TodoItemProps {
  todo: Todo,
  key: number,
  toggleComplete: (id: number) => void

}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, key, toggleComplete }) => {
  return (
    <li
      key={key}
      onClick={() => toggleComplete(todo.id)}
      className={todo.completed ? 'line-through' : ''}
    >
      {todo.text}
    </li>
  );
}