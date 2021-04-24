import React, { useState, ChangeEvent } from 'react'

interface ResultFromAPI {
  id: number,
  data: string
}

const resultsFromAPI = [
  { id: 1, data: 'res1' },
  { id: 2, data: 'res2' },
  { id: 3, data: 'res3' },
  { id: 4, data: 'res4' },
  { id: 5, data: 'res5' }
];
export interface InputDebounceProps { }
export const InputDebounce: React.FC<InputDebounceProps> = ({ }) => {
  const [value, setValue] = useState('');
  const [data, setData] = useState<ResultFromAPI[]>([]);

  const [loading, setLoading] = useState(false);
  const [disableInput, setDisableInput] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const getSuggestionsFromAPI = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setLoading(true);

    setShowResults(false);
    setTimeout(() => {
      setDisableInput(true);
    }, 200);

    setTimeout(() => {
      setData(resultsFromAPI);
      setLoading(false);
      setDisableInput(false);
      setShowResults(true);
    }, 2000);
  }

  const selectResult = (data: string) => {
    setValue(data);
    setShowResults(false);
  }

  const showSearchSuggestions = () => {
    if (loading) return (<h2>Loading, so wait you cunt!</h2>);
    if (!showResults) return null;

    return (
      <ul>
        {data.map((result: ResultFromAPI, idx: number) => (
          <li
            key={idx}
            onClick={() => selectResult(result.data)}
          >
            {result.data}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="flex-col w-30 left-50">
      <label htmlFor="debounce-input">Search in our API</label>
      <input
        type="text"
        name="debounce-input"
        value={value}
        onChange={getSuggestionsFromAPI}
        disabled={disableInput}
      />
      {showSearchSuggestions()}
    </div>
  );
}