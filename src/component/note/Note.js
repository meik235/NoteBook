import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Note = (props) => {
  const [notes, setNotes] = useState([]);
  const [checkedBoxId, setCheckedBoxId] = useState([]);

  const checkedBoxIdHandler = (event) => {
    let id = event.target.value;
    if (!checkedBoxId.includes(id)) {
      setCheckedBoxId((prevState) => [...prevState, id]);
      // setCheckedBoxId(event.target.value);
    } else {
      let copyCheckedBoxId = checkedBoxId.filter((element) => element !== id);
      setCheckedBoxId(copyCheckedBoxId);
    }
  };
  
  console.log(checkedBoxId);

  useEffect(() => {
    loadNotes();
  }, [props.onSearchNote]);

  const loadNotes = async () => {
    const result = await axios.get("http://localhost:3003/notes");
    if (props.onSearchNote === "") {
      setNotes(result.data.reverse());
    } else {
      setNotes(
        result.data.filter(
          (note) =>
            note.noteTitle.toLowerCase().includes(props.onSearchNote) ||
            note.noteTitle.includes(props.onSearchNote)
        )
      );
    }
  };

  const deleteNote = async (id) => {
    await axios
      .get(`http://localhost:3003/notes/${id}`)
      .then(async (res) => {
        await axios.post("http://localhost:3003/backup", {
          id: res.data.id,
          noteTitle: res.data.noteTitle,
          noteText: res.data.noteText,
          date: res.data.date,
          isVisible: res.data.isVisible,
        });
        await axios
          .delete(`http://localhost:3003/notes/${res.data.id}`)
          .then(() => {
            loadNotes();
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNoteHandler = async (id) => {
    for (const element of id) {
      await axios
        .get(`http://localhost:3003/notes/${element}`)
        .then(async (res) => {
          await axios.post("http://localhost:3003/backup", {
            id: res.data.id,
            noteTitle: res.data.noteTitle,
            noteText: res.data.noteText,
            date: res.data.date,
            isVisible: res.data.isVisible,
          });
          await axios
            .delete(`http://localhost:3003/notes/${res.data.id}`)
            .then(() => {
              loadNotes();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setCheckedBoxId([]);
  };

  const archiveHandler = async (id) => {
    for (const element of id) {
      await axios
        .patch(`http://localhost:3003/notes/${element}`, {
          isVisible: false,
        })
        .then(() => {
          loadNotes();
        })
        .catch((err) => console.log(err));
    }
    setCheckedBoxId([]);
  };

  const showAllHandler = async () => {
    await axios
      .get("http://localhost:3003/notes")
      .then(async (res) => {
        for (let i = 0; i < res.data.length; i++) {
          await axios
            .patch(`http://localhost:3003/notes/${res.data[i].id}`, {
              isVisible: true,
            })
            .then(() => {
              // loadNotes();
            })
            .catch((err) => {
              console.log(err);
            });
          loadNotes();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    switch (props.onChooseButton) {
      case "DeleteSelected":
        deleteNoteHandler(checkedBoxId);
        props.onDeactive();
        loadNotes();
        break;
      case "Archive":
        archiveHandler(checkedBoxId);
        props.onDeactive();
        loadNotes();
        break;
      case "ShowAll":
        showAllHandler();
        props.onDeactive();
        loadNotes();
        break;
    }
  }, [props.onChooseButton, checkedBoxId]);

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div
          className="shadow p-3 my-2 bg-light rounded"
          key={note.id}
          style={{
            visibility: note.isVisible ? "visible" : "hidden",
            display: note.isVisible ? "block" : "none",
          }}
        >
          <div className="d-flex flex-row justify-content-between">
            <h3 className="display-6">{note.noteTitle}</h3>
            <input
              className="form-check-input"
              type="checkbox"
              name="checkedBox"
              value={note.id}
              id="flexCheckDefault"
              style={{
                visibility: note.isVisible ? "visible" : "hidden",
              }}
              onChange={checkedBoxIdHandler}
            ></input>
          </div>
          <p>{note.noteText}</p>
          <span className="d-flex justify-content-between px-1">
            <NavLink
              className="btn btn-outline-primary btn-sm"
              to={`/notes/edit/${note.id}`}
            >
              Edit...
            </NavLink>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </span>
          <small className="d-flex flex-sm-row-reverse pt-2">{note.date}</small>
        </div>
      ))}
    </div>
  );
};

export default Note;
