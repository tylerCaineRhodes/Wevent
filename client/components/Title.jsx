import React from 'react';

const Title = ({
  buttonText, buttonClass, onClick,
}) => (
  <div>
    <nav className="navbar navbar-light" style={{ backgroundColor: 'orange', color: 'white' }}>
      <span className="nav-brand mb-0 h1">Wevent</span>
      <button className={buttonClass} type="button" onClick={onClick}>{buttonText}</button>
    </nav>
  </div>
);

export default Title;
