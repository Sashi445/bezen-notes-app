import * as actionTypes from "./actionTypes";
import {
  addNoteFb,
  deleteNoteFb,
  readAllNotesFb,
  updateNoteFb,
} from "./../services/firebase";

export const addNote = (note) => {
  return {
    type: actionTypes.ADD_NOTE,
    payload: {
      id: Date.now(),
      createdAt: Date.now(),
      ...note,
    },
  };
};

export const pinNote = (noteId) => {
  return {
    type: actionTypes.PIN_NOTE,
    payload: {
      noteId,
    },
  };
};

export const unpinNote = (noteId) => {
  return {
    type: actionTypes.UNPIN_NOTE,
    payload: {
      noteId,
    },
  };
};

export const deleteNote = (noteId) => {
  return {
    type: actionTypes.DELETE_NOTE,
    payload: {
      noteId,
    },
  };
};

export const editNote = (note, id) => {
  return {
    type: actionTypes.EDIT_NOTE,
    payload: {
      id,
      ...note,
    },
  };
};

export const addNoteAsync = async (note) => {
  const created = await addNoteFb(note);
  if (!created) return;
  return addNote(note);
};

export const updateNoteAsync = async (note) => {
  const created = await updateNoteFb(note);
  if (!created) return;
  return editNote(note);
};

export const deleteNoteAsync = async (noteId) => {
  const deleted = await deleteNoteFb(noteId);
  if (!deleted) return;
  return deleteNote(noteId);
};

export const readAllNotesAsync = async () => {
  const notes = await readAllNotesFb();
  return {
    type: actionTypes.READ_ALL_NOTES,
    payload: {
      notes: Object.values(notes),
    },
  };
};
