import NotesList from "./NotesList";
import "./Aside.css";
import { useContext, useState } from "react";
import NotesContext from "../context/NotesProvider";
import { TYPES } from "../types";
import ModalConfirm from "./ModalConfirm";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
const Aside = () => {
  const { dispatchNotes, isAddingNote, notes, isDarkMode, setIsDarkMode } =
    useContext(NotesContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClick = () => {
    // console.log("agregando nota");

    const addNoteToForm = () => {
      dispatchNotes({
        type: TYPES.ADD_NOTE_TO_FORM,
        payload: {
          isAddingNote: true,
        },
      });
    };
    addNoteToForm();
  };
  const deleteAllNotes = () => {
    localStorage.setItem("yoc-notas", "[]");
    dispatchNotes({ type: TYPES.GET_ALL_NOTES, payload: [] });
  };

  const switchToDarkMode = () => {
    document.body.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("dark-notas", JSON.stringify(!isDarkMode));
  };
  return (
    <aside className="aside-notes">
      <ModalConfirm
        open={modalIsOpen}
        handleClose={() => setModalIsOpen(false)}
        areYouSure={() => {
          deleteAllNotes();
          setModalIsOpen(false);
        }}
      >
        <p>¿Estas seguro que deseas eliminar todas las notas?</p>
      </ModalConfirm>

      <div className="aside-notes__header">
        <h1 className="aside-notes__logo">Yoc-notas</h1>
        <div className="aside-notes__btns-header">
          {notes.length > 0 && (
            <button
              onClick={() => setModalIsOpen(true)}
              className="aside-notes__delete-all"
              disabled={isAddingNote ? true : false}
            >
              Borrar todo
            </button>
          )}
          <button
            aria-label="dark-mode"
            onClick={switchToDarkMode}
            className="aside-notes__dark-btn"
          >
            {isDarkMode ? <IoMdSunny /> : <FaMoon />}
          </button>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="aside-notes__btn"
        disabled={isAddingNote ? true : false}
      >
        Agregar nota
      </button>
      {notes.length > 0 ? (
        <NotesList />
      ) : (
        <div className="aside-notes__empty-list">
          <h2>No hay notas</h2>
          <video
            className="aside-notes__video"
            autoPlay
            loop
            muted
            src="https://res.cloudinary.com/diusrxrra/video/upload/v1628390866/pato_g55eyb.webm"
          ></video>
        </div>
      )}
    </aside>
  );
};

export default Aside;
