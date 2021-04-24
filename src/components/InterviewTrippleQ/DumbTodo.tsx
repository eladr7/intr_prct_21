import React, { useState } from 'react'

interface Todo {
  id: number,
  task: string,
  completed: boolean
}

export interface DumbTodoProps { }
export const DumbTodo: React.FC<DumbTodoProps> = ({ }) => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);


  const addTodo = (): void => {
    if (!value) return;

    setTodos([...todos, {
      id: Math.random(),
      task: value,
      completed: false
    }]);

    setValue('');
  }

  const toggleCompleted = (id: number) => {
    const updatedTodos = todos.map((todo: Todo) => {
      if (todo.id === id) {
        return {
          id: todo.id,
          task: todo.task,
          completed: !todo.completed
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  const getTodosList = (): JSX.Element[] => todos.map((todo: Todo) => (
    <p
      key={todo.id}
      onClick={() => toggleCompleted(todo.id)}
      className={todo.completed ? 'line-through' : ''}
    >
      {todo.task}
    </p>
  ))

  const remaining = todos.reduce((count: number, todo:Todo) => todo.completed ? count : count + 1, 0);

  return (
    <div>
      <h1>{remaining} task remain out of {todos.length} todos</h1>
      <div>
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={addTodo}>Add task you bitch</button>
      </div>
      {getTodosList()}
    </div>
  );
}