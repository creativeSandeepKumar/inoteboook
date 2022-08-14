// Routes to make api for fetchallNotes, addnote, updatenote and deletnote
const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
// Route: 1 - Get all the notes using: GET "/api/notes/fetchallnotes" login required
// router to get req with fetchallnotes endpoint and fetchuser middleware
// async function
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // declare notes to find note of user by id of user
    const notes = await Note.find({ user: req.user.id });
    // response of notes as json
    res.json(notes);
    // catch - bad req
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Route: 2 - Add a new note using : POST "/api/notes/addnote" login required
// set router as post with addnote api endpoint and fetchuser middleware
router.post(
  "/addnote",
  fetchuser,
  [
    // set title, description as body and set validation check
    // async req
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be at least 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // try - declare title, description, tag from req body
      const { title, description, tag } = req.body;
      // desclare errors to validate validation on req
      const errors = validationResult(req);
      // if validation error then return bad req
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // declare note to add new note in shema with title, desc, tag, and user by id
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      // as res savednote as json
      const savedNote = await note.save();
      res.json(savedNote);
      // catch - bad req
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// Route: 3 - Update note using Put "/api/notes/updatenote" Login required
// set router as put req to updatenote/:id with fetchuser middleware
// async function
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  // declare title, desc, tag from req body
  // try -

  const { title, description, tag } = req.body;
  try {
    // declare newNote object
    const newNote = {};
    // set title, desc and tag as newnote - title, desc and tag
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // find the note to be updated and update it
    // declare note to find note by id from req.params.id
    let note = await Note.findById(req.params.id);
    // if note not then not allowed
    if (!note) {
      return res.status(404).send("Not Allowed");
    }
    // if note of user of string not from id of user then not allowed
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    // set note to find note by id from schema and update by id params , also set newNote and new true
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    // note as json from res
    res.json({ note });
    // catch - internal server error
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Route: 4 - Delete notes using : POST "/api/auth/updatenote". login required
// set router delete req  with deletenote and id endpoint and also fechuser middleware
// async function -
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // try -
  try {
    // find the note to be deleted and deleted id
    let note = await Note.findById(req.params.id);
    // declare note to assign find note from schema by id from params is
    // if not note found return not allowed
    if (!note) {
      return res.status(404).send("Not Allowed");
    }
    // if note of user string is not from params id then not allowed
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    //  note assign find and delete by id from note schema by params id
    // json res text
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Find by id and deleted successfully" });
    // catch - internal server error
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
