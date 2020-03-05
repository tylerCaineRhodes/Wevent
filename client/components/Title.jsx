import React from 'react';

const Title = ({
  buttonText, buttonClass, onClick, changePage, page, loginDisplayName,
}) => (
  <div>
    <nav className="navbar navbar-light" style={{ backgroundColor: 'orange', color: 'white' }}>
      <span className="nav-brand mb-0 h1">Wevent</span>
      <>{page === 'MainPage' && loginDisplayName !== 'Guest' && <button className="dashboardButton" type="button" onClick={changePage}>User Dashboard</button>}</>
      <button className={buttonClass} type="button" onClick={onClick}>{buttonText}</button>
    </nav>
  </div>
);

export default Title;
