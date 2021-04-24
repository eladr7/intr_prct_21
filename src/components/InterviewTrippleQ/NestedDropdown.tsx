import React, { useState } from 'react'
import axios from 'axios';


export interface ExpandableProps {
  toggleExpand: () => void,
  expand: boolean,
  obj: object,
  lastItem?: boolean
  idx?: number
}
const Expandable: React.FC<ExpandableProps> = ({ toggleExpand, expand, obj, lastItem = false, idx = -1 }) => {
  return (
    <div>
      <h4 onClick={toggleExpand}>{idx !== -1 ? idx : Object.keys(obj)[0]}</h4>
      <ul className={expand ? 'visi' : 'invisi'}>
        {lastItem ? <p>{Object.values(obj)[0]}</p> :
          idx === -1 ? <NestedRow obj={Object.values(obj)[0]} /> : <NestedRow obj={obj} />
        }
      </ul>
    </div>
  );
}

const checkIfSingleKeyVal = (obj: object) =>
  obj &&
  Object.keys(obj).length === 1 &&
  obj.constructor === Object;

export interface NestedRowProps {
  obj: object
}
const NestedRow: React.FC<NestedRowProps> = ({ obj }): JSX.Element => {
  const [expand, setExpand] = useState(true);
  const toggleExpand = () => { setExpand(!expand); }

  if (!obj) return (<></>);

  if (checkIfSingleKeyVal(obj)) {
    if (typeof Object.values(obj)[0] === 'string') {
      return <Expandable toggleExpand={toggleExpand} expand={expand} obj={obj} lastItem={true} />;
    }
    else {
      return <Expandable toggleExpand={toggleExpand} expand={expand} obj={obj} />;
    }
  }

  return (
    <ul>
      {Object.entries(obj).map(([key, value]) => <NestedRow obj={{ [key]: value }} />)}
    </ul>
  );
}

export interface NestedRowContainerProps {
  obj: object,
  idx: number
}
const NestedRowContainer: React.FC<NestedRowContainerProps> = ({ obj, idx }) => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = () => { setExpand(!expand); }
  return (
    <Expandable toggleExpand={toggleExpand} expand={expand} obj={obj} idx={idx} />
  );
}

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

interface UserName {
  title: string,
  first: string,
  last: string
}
interface UserData {
  cell: string,
  dob: { date: string, age: number },
  email: string,
  id: { name: string, value: string },
  location: {
    city: string,
    coordinates: {
      latitude: string,
      longitude: string
    },
    country: string,
    postcode: number,
    state: string,
    street: {
      number: number,
      name: string
    }
  },
  name: UserName,
}
export interface NestedDropdownProps { }
export const NestedDropdown: React.FC<NestedDropdownProps> = ({ }) => {
  const [responseData, setResponseData] = useState<any[]>([]);

  const fetchNestedList = async () => {
    const result = await fetchFromAPI();

    setResponseData([...responseData, result]);
  }

  const createNestedList = () => (
    <ul>
      {responseData.map((blat: object, idx: number) => <NestedRowContainer obj={blat} idx={idx} />)}
    </ul>
  );

  return (
    <div>
      <button onClick={fetchNestedList}>Fetch nested list</button>
      {createNestedList()}
    </div>
  );
}