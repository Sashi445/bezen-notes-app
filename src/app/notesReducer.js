import * as actionTypes from "./actionTypes";

export const initialState = [];

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.READ_ALL_NOTES:
      state = [...action.payload.notes];
      return state;
    case actionTypes.ADD_NOTE:
      state = [action.payload, ...state];
      return state;
    case actionTypes.DELETE_NOTE:
      state = state.filter((note) => note.id !== action.payload.noteId);
      return state;
    case actionTypes.PIN_NOTE:
      state = state.map((note) =>
        note.id === action.payload.noteId ? { ...note, pinned: true } : note
      );
      return state;
    case actionTypes.UNPIN_NOTE:
      state = state.map((note) =>
        note.id === action.payload.noteId ? { ...note, pinned: false } : note
      );
      return state;
    case actionTypes.EDIT_NOTE:
      state = state.map((note) =>
        note.id === action.payload.id ? { ...note, ...action.payload } : note
      );
      return state;
    default:
      return state;
  }
};
