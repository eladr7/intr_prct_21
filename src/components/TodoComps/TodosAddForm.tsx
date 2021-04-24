import React, { useState, FormEvent, useContext } from 'react'
import { TodosContext } from './TodoContext/TodoContext';
import { TODO_ACTIONS } from './TodoContext/TodoDefinitions';

export interface TodosAddFormProps {

}

export const TodosAddForm: React.FC<TodosAddFormProps> = ({ }) => {
  const [value, setValue] = useState('');
  const { dispatch } = useContext(TodosContext);

  const addTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      setValue('A task cannot be empty you cunt!');
      return;
    }

    dispatch({
      type: TODO_ACTIONS.ADD,
      todo: {
        text: value
      }
    });

    setValue('');
  }

  return (
    <form action="" onSubmit={addTodo}>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      <input type="submit" value="Add task" />
    </form>
  );
}