import React from 'react'
import { DumbTodo } from './InterviewTrippleQ/DumbTodo'
import { SearchableDropdown } from './InterviewTrippleQ/SearchableDropdown';

export interface InterviewTrippleQProps {

}

export const InterviewTrippleQ: React.FC<InterviewTrippleQProps> = ({  }) => {
  return (
    <div>
      <SearchableDropdown />
      <DumbTodo />
    </div>
  );
}