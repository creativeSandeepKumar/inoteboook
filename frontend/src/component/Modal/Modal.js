import React, { useRef, useState } from "react";
import "./Modal.css";

const Modal = (props) => {
  let { editNote } = props;
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.clicl();
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
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  return (
    <>
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
            </label>{" "}
            <br />
            <input
              type="text"
              name="etitle"
              id="etitle"
              value={note.etitle}
              onChange={onChange}
              minLength={5}
              required
            />{" "}
            <br />
            <label htmlFor="edescription" className="modal-label">
              Description
            </label>{" "}
            <br />
            <input
              type="text"
              name="edescription"
              id="edescription"
              value={note.edescription}
              onChange={onChange}
              minLength={5}
              required
            />{" "}
            <br />
            <label htmlFor="etag" className="modal-label">
              Tag
            </label>{" "}
            <br />
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
    </>
  );
};

export default Modal;
