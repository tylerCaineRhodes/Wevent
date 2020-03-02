import React from 'react';
import Title from './Title.jsx';
import Filter from './Filter.jsx';
import MainCalendar from './MainCalendar.jsx';

export default function MainPage(props) {
  return (
    <>
      <Title />
      <div style={{ width: '33%', display: 'inline-block' }}>
        <Filter />
      </div>
      <div style={{ width: '66%', float: 'right' }}>
        <MainCalendar />
      </div>
    </>
  );
}
