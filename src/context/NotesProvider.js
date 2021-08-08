import { createContext, useEffect, useReducer, useRef, useState } from "react";
import notesReducer from "../reducers/notesReducer";
import { TYPES } from "../types";

const NotesContext = createContext();
// const notes = JSON.parse(localStorage.getItem("yoc-notas")) || [];

const initialNotes = {
  notes: [],
  isAddingNote: false,
  isEditingNote: false,
};
export const initialForm = {
  title: "",
  body: "",
};
const NotesProvider = ({ children }) => {
  const [stateNotes, dispatchNotes] = useReducer(notesReducer, initialNotes);
  const [noteForm, setNoteForm] = useState(initialForm);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const refIdNote = useRef();

  useEffect(() => {
    const dataNotes = JSON.parse(localStorage.getItem("yoc-notas")) || [];
    dispatchNotes({ type: TYPES.GET_ALL_NOTES, payload: dataNotes });
    setIsDarkMode(JSON.parse(localStorage.getItem("dark-notas")) || false);
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  // console.log("esta en modo oscuro: ", isDarkMode);
  const { notes, isAddingNote, isEditingNote } = stateNotes;
  const data = {
    notes,
    dispatchNotes,
    isAddingNote,
    isEditingNote,
    noteForm,
    setNoteForm,
    refIdNote,
    isDarkMode,
    setIsDarkMode,
  };
  return <NotesContext.Provider value={data}>{children}</NotesContext.Provider>;
};
export { NotesProvider };
export default NotesContext;
