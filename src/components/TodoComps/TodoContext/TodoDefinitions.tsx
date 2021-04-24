export const TODO_ACTIONS = {
  ADD: 'ADD',
  TOGGLE: 'TOGGLE'
}

export interface Todo {
  id: number,
  text: string,
  completed: boolean
}