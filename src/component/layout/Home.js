import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Note from "../note/Note";

const Home = (props) => {
  const [choosebuttonValue, setChoosebuttonValue] = useState("");

  const onDeactiveHandler = () => {
    setChoosebuttonValue("");
  };

  const chooseButtonHandler = (event) => {
    setChoosebuttonValue(event.target.name);
  };

  return (
    <div className="container my-4 text-start">
      <div className="shadow px-5 pt-3 pb-2 d-flex justify-content-between">
        <div>
          <Header title="Your Privacy In Your Hand" />
        </div>
        <div className="pt-1">
          <NavLink
            className="btn btn-outline-success mx-2"
            name="Backup"
            to="/backup/notes"
          >
            Backup
          </NavLink>
          <button
            className="btn btn-outline-danger mx-2"
            name="DeleteSelected"
            onClick={chooseButtonHandler}
          >
            Delete
          </button>
          <button
            className="btn btn-outline-secondary mx-2"
            name="Archive"
            onClick={chooseButtonHandler}
          >
            Archive
          </button>
          <button
            className="btn btn-outline-info mx-2"
            name="ShowAll"
            onClick={chooseButtonHandler}
          >
            Show all
          </button>
        </div>
      </div>
      <div className="w-100 mx-auto shadow p-5 mt-3">
        <h2 className="display-6">All Notes</h2>
        <hr />
        <Note
          onSearchNote={props.onSearchHome}
          onChooseButton={choosebuttonValue}
          onDeactive={onDeactiveHandler}
        />
      </div>
    </div>
  );
};

export default Home;
