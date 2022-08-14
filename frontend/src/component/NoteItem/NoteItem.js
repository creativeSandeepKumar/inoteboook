import React, { useContext } from "react";
import noteContext from "../../context/noteContext";

import "./NoteItem.css";

const NoteItem = (props) => {
  const { note, updateNote, openModal } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const updateNotes = () => {
    updateNote(note);
    openModal();
  };

  return (
    <>
      <section className="noteItem-section">
        <aside className="noteItem-aside">
          <span className="h5">{note.title}</span>
          <span className="noteItem-icon">
            <i
              className="fa-solid fa-trash-can"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted successfully", "success");
              }}
            ></i>
          </span>
          <span className="noteItem-icon">
            <i className="fa-solid fa-pen-to-square" onClick={updateNotes}></i>
          </span>
        </aside>
        <p>{note.description}</p>
        <p>{note.tag}</p>
      </section>
    </>
  );
};

export default NoteItem;
