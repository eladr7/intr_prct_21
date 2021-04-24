import React from 'react';
import logo from './logo.svg';
import { Todos } from './components/Todos';
import { InputDebounce } from './components/InputDebounce';

function App() {
  return (
    <div className="App">
      <InputDebounce />
      <Todos />
    </div>
  );
}

export default App;
