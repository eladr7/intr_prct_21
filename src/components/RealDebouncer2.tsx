import React, { useState, ChangeEvent, useCallback, useRef, MutableRefObject, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const fetchFromAPI = (query: string): Promise<UserInfo[]> => axios.get('https://randomuser.me/api?results=8')
  .then(({ data: { results } }) => {
    console.log(results);
    return results;
  })
  .catch(error => {
    console.log(error);
    return [];
  });

const createMatcher = (query: string) => {
  let pattern = '';
  for (let c of query.toLocaleLowerCase()) pattern += c + '.*';
  pattern = pattern.slice(0, -2);

  return new RegExp(pattern, 'g');
}

const isMatching = async (suggestion: string, queryPatternMatcher: RegExp) =>
  await queryPatternMatcher.test(suggestion.toLocaleLowerCase());

interface UserInfo {
  email: string
}

export interface RealDebouncer2Props { }
export const RealDebouncer2: React.FC<RealDebouncer2Props> = ({ }) => {
  const [query, setQuery] = useState('');

  const [loading, setLoading] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const [dataFromAPI, setDataFromAPI] = useState<string[]>([]);
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleFetch = async (inputQuery: string) => {
    const results = await fetchFromAPI(inputQuery);
    const emails = results.map((result: UserInfo) => result.email);

    setLoading(false);
    setInputDisabled(false);
    setDisplayResults(true);
    setDataFromAPI(emails);

    inputRef.current.focus();
  }

  const debouncedFetch = useCallback(
    debounce(
      (inputQuery: string) => handleFetch(inputQuery),
      400),
    []);

  const fetchSuggestionsFromAPI = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setQuery('');
      setDisplayResults(false);
      return;
    }
    setQuery(e.target.value);
    setLoading(true);
    setDisplayResults(false);

    setTimeout(() => {
      setInputDisabled(true);
    }, 400);

    debouncedFetch(e.target.value);
  }

  const onSelectItem = (email: string) => {
    setQuery(email);
    setDisplayResults(false);
    inputRef.current.focus();
  }

  const displaySuggestions = () => {
    if (!query) return null;
    if (loading) return <p>...LOADING</p>;
    if (!displayResults) return null;

    const queryMatcher = createMatcher(query);
    return (
      <ul>
        {dataFromAPI.map((email: string, idx: number) => {
          if (isMatching(email, queryMatcher)) {
            return (
              <p key={idx} onClick={() => onSelectItem(email)}>{email}</p>
            )
          }
        })}
      </ul>
    );
  }

  return (
    <div className="flex-col">
      <div className="searchable-dropdown">
        <label htmlFor="">Get info from API</label>
        <input
          type="text"
          value={query}
          onChange={fetchSuggestionsFromAPI}
          disabled={inputDisabled}
          ref={inputRef}
        />
      </div>
      {displaySuggestions()}
    </div>
  );
}