import React from 'react';
import Title from './Title.jsx';
import Filter from './Filter.jsx';
import MainCalendar from './MainCalendar.jsx';

export default function MainPage(props) {
  return (
    <>
      <Title />
      <Filter />
      <MainCalendar />
    </>
  );
}
