import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { nanoid } from "nanoid";
import axios from "axios";

const AddNote = () => {
  let navigate = useNavigate();

  let setDate = new Date();
  setDate = setDate.toLocaleDateString();

  const [note, setNote] = useState({
    id: nanoid(),
    noteTitle: "",
    noteText: "",
    date: setDate,
    isVisible: true,
  });

  const { noteTitle, noteText } = note;

  const onInputChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    if (noteTitle.trim().length > 0 || noteText.trim().length > 0) {
      event.preventDefault();
      await axios.post("http://localhost:3003/notes", note);
    } else {
      alert("There is nothing to save.");
    }
    navigate("/");
  };

  return (
    <div className="container py-4 text-start">
      <NavLink className="btn btn-outline-secondary mb-4" to={"/"}>
        Back to Home
      </NavLink>
      <div className="w-100 mx-auto shadow p-5">
        <h1 className="display-6">Write Note</h1>
        <hr />
        <form onSubmit={(event) => onSubmit(event)}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              required="true"
              placeholder="Enter the title..."
              name="noteTitle"
              value={noteTitle}
              onChange={(event) => onInputChange(event)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Write your note..."
              name="noteText"
              value={noteText}
              onChange={(event) => onInputChange(event)}
            />
          </div>
          <button className="btn btn-outline-success mb-4">Add Note</button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
