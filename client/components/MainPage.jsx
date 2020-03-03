import React from 'react';
import Title from './Title.jsx';
import Filter from './Filter.jsx';
import MainCalendar from './MainCalendar.jsx';

const MainPage = (props) => (
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

export default MainPage;
