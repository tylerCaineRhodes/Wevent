import React from 'react';

const Title = ({
  buttonText, buttonClass, onClick, changePage, page, loginDisplayName, handleGuestBackToLandingPage,
}) => (
  <div>
    <nav className="navbar navbar-light">
      <span className="nav-brand mb-0 h1"><img src='./img/NavbarLogo.png' className="navbarLogo" /></span>
      <>{page === 'MainPage' && loginDisplayName !== 'Guest' && <button className="dashboardButton" type="button" onClick={changePage}>User Dashboard</button>}</>
      <button className={buttonClass} type="button" onClick={onClick}>{buttonText}</button>
      {/* {page === 'MainPage' && loginDisplayName !== 'Guest' && <button className="logoutButton" type="button" onClick={handleGuestBackToLandingPage}>Log Out</button>} */}
    </nav>
  </div>
);

export default Title;
