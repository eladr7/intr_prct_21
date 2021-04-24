import React, { useContext } from 'react'
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodoContext/TodoContext';
import { Todo, TODO_ACTIONS } from './TodoContext/TodoDefinitions';

export interface TodosListProps {

}

export const TodosList: React.FC<TodosListProps> = ({ }) => {
  const { todos, dispatch } = useContext(TodosContext);

  const toggleComplete = (id: number) => {
    dispatch({
      type: TODO_ACTIONS.TOGGLE,
      todo: {
        id: id
      }
    })
  }

  const createTodosList = () => {
    return todos.map((todo: Todo, index: number) => (
      <TodoItem
        todo={todo}
        key={index}
        toggleComplete={toggleComplete}
      />
    ));
  }

  return (
    <ul>
      {createTodosList()}
    </ul>
  );
}