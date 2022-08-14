import React, { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../../context/noteContext";
import AddNote from "../AddNote/AddNote";

import NoteItem from "../NoteItem/NoteItem";
import "./Notes.css";
import "../Modal/Modal.css";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, editNote, getNotes } = context;

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    e.preventDefault();
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  let modal = document.getElementById("myModal");
  const closeModal = () => {
    modal.style.display = "none";
  };

  const openModal = () => {
    modal.style.display = "block";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <>
      <section className="notes-addnote">
        <AddNote showAlert={props.showAlert} />
      </section>
      <section className="notes-modal">
        <button
          id="myBtn"
          ref={ref}
          className="demo-modal-btn"
          onClick={openModal}
        >
          Launch Demo Modal
        </button>
        <section className="modal-section" id="myModal">
          <main className="modal-main">
            <h5>Update Note</h5>
            <form className="modal-form">
              <label htmlFor="etitle" className="modal-label">
                Title
              </label>
              <input
                type="text"
                name="etitle"
                id="etitle"
                value={note.etitle}
                onChange={onChange}
                minLength={5}
                required
              />
              <label htmlFor="edescription" className="modal-label">
                Description
              </label>
              <input
                type="text"
                name="edescription"
                id="edescription"
                value={note.edescription}
                onChange={onChange}
                minLength={5}
                required
              />
              <label htmlFor="etag" className="modal-label">
                Tag
              </label>
              <input
                type="text"
                name="etag"
                id="etag"
                value={note.etag}
                onChange={onChange}
                minLength={5}
                required
              />
              <button
                type="button"
                className="modal-close"
                onClick={closeModal}
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="modal-update"
              >
                Update Modal
              </button>
            </form>
          </main>
        </section>
      </section>
      <section className="notes-main-section">
        <h2>Your Notes</h2>

        <section className="notes-section">
          {notes.length === 0
            ? "No Notes to display"
            : notes.map((note) => {
                return (
                  <NoteItem
                    key={note._id}
                    note={note}
                    updateNote={updateNote}
                    openModal={openModal}
                    showAlert={props.showAlert}
                  />
                );
              })}
        </section>
      </section>
    </>
  );
};

export default Notes;
