import React from 'react';
import logo from './logo.svg';
import { Todos } from './components/Todos';
import { InputDebounce } from './components/InputDebounce';
import { InputSuggestions } from './components/InputSuggestions';
import { BenAwad } from './components/BenAwad';

function App() {
  return (
    <div className="App">
      <InputSuggestions />
      <InputDebounce />
      <Todos />
      <BenAwad />
    </div>
  );
}

export default App;
