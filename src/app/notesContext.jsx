import { createContext, useReducer, useState } from "react";
import { notesReducer, initialState } from "./notesReducer";

export const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {

  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
