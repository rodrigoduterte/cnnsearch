import React from "react";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{height: "100px"}}>
    <a className="navbar-brand mb-50" href="/">
      <h3>NY Times Articles Scraper</h3>
    </a>
    <ul className="h-menu">
      <li><a href="/saved">Saved</a></li>
    </ul>
    
  </nav>
);

export default Nav;
