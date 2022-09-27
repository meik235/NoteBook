import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../note/Search";

const Navbar = (props) => {
  const onSearchNavHandler = (searchData) => {
    props.onSearchNav(searchData);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          NoteBook
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        <Search onSearch={onSearchNavHandler} />
        <NavLink className="btn btn-outline-primary" to="/notes/add">
          Add Note
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
