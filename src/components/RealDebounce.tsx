import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const getQueryMatcher = (query: string) => {
  // const sukaBlat = /(?=.*[0-9])(?=.*[=+\-*/^!?,.;:])(?=.*[A-Z]).{8,30}/.test('sukaasPassword=s1^*!?,.:;');
  // const sukaBlat2 = /^((?!password).)*$/i.test('sukaasPassword=s1^*!?,.:;');
  // const sukaBlat = /^(?=.*[0-9])(?=.*[=+\-*/^!?,.;:])(?=.*[A-Z]).{8,30}((?!password).)*$/.test('sukapasswordasP=s1^*!?,.:;');

  // return suggestion.includes(query);

  let pattern = '';
  for (let c of query.toLocaleLowerCase()) pattern += c + '.*';
  pattern = pattern.slice(0, -2);

  // check if 'pattern' exists inside 'suggestion'
  let matcher = new RegExp(pattern, 'g');
  return matcher;
}

const isMatching = (suggestion: string, matcher: RegExp) => {
  return matcher.test(suggestion.toLocaleLowerCase());
}

const fetchFromAPI = (query: string) => axios.get('https://randomuser.me/api?results=8')
  .then(({ data: { results } }) => {
    // handle success
    console.log(results);
    console.log(query);
    return results;
  })
  .catch(error => {
    // handle error
    console.log(error);
    return [];
  });

export interface RealDebounceProps { }
export const RealDebounce: React.FC<RealDebounceProps> = ({ }) => {
  const [query, setQuery] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [dataFromAPI, setDataFromAPI] = useState<object[]>([]);
  const [loading, setLoading] = useState(false);
  const [presentSuggestions, setPresentSuggestions] = useState(false);


  const filterDataFromAPI = (response: any, queryString: string) => {
    const matcher = getQueryMatcher(queryString);
    const filtered = response.filter((item: any) => isMatching(item.email, matcher));

    setDataFromAPI(filtered);
  }

  const getSuggestions = async (newValue: string) => {
    const response = await fetchFromAPI(newValue);

    setPresentSuggestions(true);
    setDisabled(false);
    setLoading(false);
    filterDataFromAPI(response, newValue);
  }

  const debouncedSave = useCallback(
    debounce((newValue: string) => getSuggestions(newValue), 500),
    []
  );

  const searchOnAPI = async (newValue: string) => {
    if (!newValue) {
      setQuery('')
      setDataFromAPI([]);
      setPresentSuggestions(false);
      return;
    }
    setQuery(newValue);
    setLoading(true);
    setPresentSuggestions(false);

    setTimeout(() => {
      setDisabled(true);
    }, 300);

    debouncedSave(newValue);
  }

  const selectResult = (email: string) => {
    setQuery(email);
    setPresentSuggestions(false);
  }

  const generateSuggestions = () => {
    if (!query) return null;
    if (loading) return <p>Loading you piece of shit, sor fucking wait!</p>;
    if (!presentSuggestions) return null;

    return (
      <ul>
        {dataFromAPI.map((item: any, idx: number) => (
          <p key={idx} onClick={() => selectResult(item.email)}>{item.email}</p>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <label htmlFor="">Enter search-word</label>
      <input type="text" value={query} onChange={e => searchOnAPI(e.target.value)} disabled={disabled} />
      {generateSuggestions()}
    </div>
  );
}