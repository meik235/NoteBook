import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Header from "../layout/Header";

const BackupNotes = () => {
  let navigate = useNavigate();

  const [backupNote, setBackupNote] = useState([]);
  const [header, setHeader] = useState("Wanna Restore?");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const result = await axios.get("http://localhost:3003/backup");
    if (result.data.length <= 0) {
      setHeader("No Backup Note...");
      setTimeout(() => {
        navigate("/");
      }, "5000");
    } else {
      setBackupNote(result.data.reverse());
    }
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:3003/backup/${id}`);
    loadNotes();
  };

  const restoreHandler = async (id) => {
    await axios
      .get(`http://localhost:3003/backup/${id}`)
      .then(async (res) => {
        await axios.post("http://localhost:3003/notes", {
          id: res.data.id,
          noteTitle: res.data.noteTitle,
          noteText: res.data.noteText,
          date: res.data.date,
          isVisible: res.data.isVisible,
        });
        await axios
          .delete(`http://localhost:3003/backup/${res.data.id}`)
          .then(() => {
            loadNotes();
          });
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container my-4 text-start">
      <div className="shadow px-5 pt-3 pb-2">
        <div className="d-flex flex-row justify-content-between">
          <Header title="Backup Notes" />
          <NavLink
            className="btn btn-outline-secondary pt-2 mt-1 mb-2"
            to={"/"}
          >
            Back to Home
          </NavLink>
        </div>
      </div>
      <div className="w-100 mx-auto shadow p-5 mt-3">
        <h2 className="display-6">{header}</h2>
        <hr />
        <div className="notes-list">
          {backupNote.map((bnote) => {
            const { id, noteTitle, noteText, date, isVisible } = bnote;
            return (
              <div
                className="shadow p-3 my-2 bg-light rounded"
                key={id}
                style={{
                  visibility: isVisible ? "visible" : "hidden",
                  display: isVisible ? "block" : "none",
                }}
              >
                <div className="d-flex flex-row justify-content-between">
                  <h3 className="display-6">{noteTitle}</h3>
                </div>
                <p>{noteText}</p>
                <span className="d-flex justify-content-between px-1">
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => {
                      restoreHandler(id);
                    }}
                  >
                    Restore
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteNote(id)}
                  >
                    Delete
                  </button>
                </span>
                <small className="d-flex flex-sm-row-reverse pt-2">
                  {date}
                </small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BackupNotes;
