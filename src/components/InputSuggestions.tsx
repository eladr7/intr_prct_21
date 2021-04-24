import React, { useState, ChangeEvent } from 'react'


const suggestionsList = [
  'israel',
  'iran',
  'iceland',
  'irland',
  'morroco',
  'montriol',
  'amsterdam',
  'england',
  'America'
];

const isMatching = (suggestion: string, query: string) => {
  // const sukaBlat = /(?=.*[0-9])(?=.*[=+\-*/^!?,.;:])(?=.*[A-Z]).{8,30}/.test('sukaasPassword=s1^*!?,.:;');
  // const sukaBlat2 = /^((?!password).)*$/i.test('sukaasPassword=s1^*!?,.:;');
  // const sukaBlat = /^(?=.*[0-9])(?=.*[=+\-*/^!?,.;:])(?=.*[A-Z]).{8,30}((?!password).)*$/.test('sukapasswordasP=s1^*!?,.:;');

  // return suggestion.includes(query);

  let pattern = '';
  for (let c of query.toLocaleLowerCase()) pattern += c + '.*';
  pattern = pattern.slice(0, -2);

  // check if 'pattern' exists inside 'suggestion'
  let matcher = new RegExp(pattern, 'g');
  return matcher.test(suggestion.toLocaleLowerCase());
}

export interface InputSuggestionsProps { }
export const InputSuggestions: React.FC<InputSuggestionsProps> = ({ }) => {
  const [query, setQuery] = useState('');
  const [list, setList] = useState<string[]>([]);

  const getSuggestions = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
    if (!e.target.value.length) {
      setList([]);
      return;
    }

    const filteredSuggestions = suggestionsList.filter((suggestion: string, idx: number) =>
      isMatching(suggestion, e.target.value));

    setList(filteredSuggestions)
  }

  const generateSuggestionsList = () => list.map((suggestion: string, idx: number): JSX.Element =>
    <p key={idx} onClick={() => { setQuery(suggestion); setList([]); }}>{suggestion}</p>);

  return (
    <div>
      <input type="text" value={query} onChange={getSuggestions} />
      <div className="flex-col">
        {generateSuggestionsList()}
      </div>
    </div>
  );
}