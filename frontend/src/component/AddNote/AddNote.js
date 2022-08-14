import React, { useContext, useState } from "react";

import noteContext from "../../context/noteContext";
import "./AddNote.css";

const AddNote = (props) => {
  const context = useContext(noteContext);

  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "Iron-Man",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <section className="addnote-section">
      <h2>Add Notes</h2>
      <form className="addnote-form">
        <label htmlFor="title" className="addnote-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={note.title}
          onChange={onChange}
          minLength={5}
          required
          className="addnote-input"
        />
        <label htmlFor="description" className="addnote-label">
          Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={note.description}
          onChange={onChange}
          minLength={5}
          required
          className="addnote-input"
        />
        <label htmlFor="tag" className="addnote-label">
          Tag
        </label>
        <input
          type="text"
          name="tag"
          id="tag"
          value={note.tag}
          onChange={onChange}
          minLength={5}
          required
          className="addnote-input"
        />

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          onClick={handleClick}
          className="addnote-btn"
        >
          Add a Note
        </button>
      </form>
    </section>
  );
};

export default AddNote;
