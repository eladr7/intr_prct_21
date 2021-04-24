import React, { useState, ChangeEvent } from 'react'
import _ from 'lodash';
import axios from 'axios';

const fetchFromAPI = (): Promise<void> => axios.get('https://randomuser.me/api')
  .then(({ data: { results } }) => {
    // handle success
    console.log(results);

    return results[0];
  })
  .catch(error => {
    // handle error
    console.log(error);
  });

export interface LodashDebounceProps { }
export const LodashDebounce: React.FC<LodashDebounceProps> = ({ }) => {
  const [dataFromAPI, setDataFromAPI] = useState([]);
  const delayedCallback = (event: ChangeEvent<HTMLInputElement>) => {
    _.debounce((event: ChangeEvent<HTMLInputElement>) => {
      // `event.target` is accessible now
      // do something that will be executed after 1000 ms
    }, 1000);
  }


  const sukaOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    delayedCallback(event);
  }


  return (
    <input type="search" onChange={sukaOnChange} />
  );
}