import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';


const fetchDataFromAPI = (nextUser: number) => axios.get('https://randomuser.me/api?page=' + nextUser)
  .then(({ data: { results } }) => {
    // console.log(JSON.stringify(results[0], null, 2));
    return results[0];
  })
  .catch(error => {
    console.log(error);
  });

interface UserName {
  title: string,
  first: string,
  last: string
}

interface UserPicture {
  medium: string,
  thumbnail: string
}

interface UserData {
  name: UserName,
  picture: UserPicture
}

export interface BenAwadProps { }
export const BenAwad: React.FC<BenAwadProps> = ({ }) => {
  const [count, setCount] = useState(0);
  const renders = useRef(0);
  useEffect(() => { renders.current++; });

  const [dataFromAPI, setDataFromAPI] = useState<UserData[]>([]);
  const [nextUser, setNextUser] = useState<number>(1);
  const [query, setQuery] = useState('');

  const fetchFromAPI = async () => {
    const { name, picture } = await fetchDataFromAPI(nextUser);
    setDataFromAPI([...dataFromAPI, { name, picture }]);
    setNextUser(nextUser + 1);
  }

  const dataListFromAPI = () => {
    return dataFromAPI.map((userData: UserData, idx: number): JSX.Element => (
      <div key={idx}>
        <p>{userData.name.title} fucking {userData.name.first} {userData.name.last}</p>
        <img src={userData.picture.thumbnail} alt="" />
      </div>
    ))
  }

  return (
    <div>
      <div>
        <button onClick={() => setCount(count + 1)}>Count!</button>
        <p>{count}</p>
      </div>
      <div>
        <p>Number of renders: {renders.current}</p>
      </div>
      <div>
        <button onClick={fetchFromAPI}>Fetch Random data from the API:</button>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
        {dataListFromAPI()}
      </div>
    </div>
  );
}