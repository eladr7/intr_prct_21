import React, { useState, ChangeEvent } from 'react'

const apiResults = [
  'alligators',
  'sharks',
  'snakes',
  'cats',
  'dogs',
  'birds',
  'farrots',
  'hunny bedgers',
  'suka animal',
  'blat animal',
  'rabbits',
  'weasels',
  'beatles',
  'dragon files'
];

const filterSuggestions = (suggestions: string[], query: string) => {
  let pattern = '';
  for (let c of query) pattern += c + '.*';
  pattern = pattern.slice(0, -2);

  const matcher = new RegExp(pattern, 'g');
  return suggestions.filter((suggestion: string) => matcher.test(suggestion));
}

export interface SearchableDropdownProps { }
export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ }) => {
  const [query, setQuery] = useState('');
  const [apiFetchedResults, setApiFetchedResults] = useState<string[]>([]);
  const [selection, setSelection] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [disableQuery, setDisableQuery] = useState(false);

  const removeFromSelection = (indexToRemove: number) => {
    const updatedSelection = selection.filter((selectionItem: string, idx: number) => idx !== indexToRemove);
    setSelection(updatedSelection);
  }
  const selectionsList = () => selection.map((selectionItem: string, idx: number) => (
    <div key={idx} className="searchable-dropdown-selection-item">
      <p>{selectionItem}</p>
      <button onClick={() => removeFromSelection(idx)}>X</button>
    </div>
  ))

  const queryAPI = (e: ChangeEvent<HTMLInputElement>) => {
    debugger
    setQuery(e.target.value);
    if (!e.target.value) {
      setQuery('');
      setApiFetchedResults([]);
      return;
    };

    setLoading(true);
    setShowSuggestions(false);

    setTimeout(() => {
      setDisableQuery(true);
    }, 300);

    setTimeout(() => {
      const filteredResults = filterSuggestions(apiResults, e.target.value);
      setApiFetchedResults(filteredResults);
      setLoading(false)
      setDisableQuery(false);
      setShowSuggestions(true);
    }, 1000);
  }

  const clearSelections = () => {
    setSelection([]);
    setQuery('');
  }

  const toggleSuggestions = () => {
    setShowSuggestions(!showSuggestions);
  }

  const appendSelection = (result: string) => {
    setSelection([...selection, result]);
  }

  const presentSuggestions = () => {
    if (loading) return (<p>Fetching data from the API</p>);

    if (!showSuggestions) return null;

    return (
      <ul className="flex-col">
        {apiFetchedResults.map((result: string, idx: number) => (
          <p key={idx} onClick={() => appendSelection(result)}>{result}</p>
        ))}
      </ul>
    )
  }

  return (
    <div className="searchable-dropdown">
      <div className="searchable-dropdown-searchbox">
        {selectionsList()}
        <input type="text" value={query} onChange={queryAPI} disabled={disableQuery} />
        <button onClick={clearSelections}>X</button>
        <p>|</p>
        <button onClick={toggleSuggestions}>&#x2304;</button>
      </div>
      {presentSuggestions()}
    </div>
  );
}