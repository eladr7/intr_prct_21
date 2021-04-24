import React from 'react'
import { DumbTodo } from './InterviewTrippleQ/DumbTodo'
import { NestedDropdown } from './InterviewTrippleQ/NestedDropdown';
import { SearchableDropdown } from './InterviewTrippleQ/SearchableDropdown';

export interface InterviewTrippleQProps {

}

export const InterviewTrippleQ: React.FC<InterviewTrippleQProps> = ({  }) => {
  return (
    <div>
      <NestedDropdown />
      <SearchableDropdown />
      <DumbTodo />
    </div>
  );
}