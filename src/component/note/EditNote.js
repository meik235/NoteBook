import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";

const EditNote = () => {
  let navigate = useNavigate();

  const { id } = useParams();

  let setDate = new Date();
  setDate = setDate.toLocaleDateString();

  const [editNote, setEditNote] = useState({
    noteTitle: "",
    noteText: "",
    date: setDate,
  });

  const { noteTitle, noteText } = editNote;

  const onInputChange = (event) => {
    setEditNote({
      ...editNote,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    loadNote();
  }, []);

  const onSubmit = async (event) => {
    if (noteTitle.trim().length > 0 || noteText.trim().length > 0) {
      event.preventDefault();
      editNote.date = setDate;
      await axios.put(`http://localhost:3003/notes/${id}`, editNote);
    } else {
      alert("There is nothing to save.");
    }
    navigate("/");
  };

  const loadNote = async () => {
    const result = await axios.get(`http://localhost:3003/notes/${id}`);
    setEditNote(result.data);
  };

  return (
    <div className="container py-4 text-start">
      <NavLink className="btn btn-outline-secondary mb-4" to={"/"}>
        Back to Home
      </NavLink>
      <div className="w-100 mx-auto shadow p-5">
        <h1 className="display-6">Edit Note</h1>
        <hr />
        <form onSubmit={(event) => onSubmit(event)}>
          <div className="form-group mb-3">
            <input
              className="form-control form-control-lg"
              type="text"
              required="true"
              placeholder="Enter the title..."
              name="noteTitle"
              value={noteTitle}
              onChange={(event) => onInputChange(event)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Write your note..."
              name="noteText"
              value={noteText}
              onChange={(event) => onInputChange(event)}
            />
          </div>
          <button className="btn btn-outline-success btn-block">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
