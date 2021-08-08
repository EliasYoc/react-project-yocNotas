import { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NotesContext, { initialForm } from "../context/NotesProvider";
import { TYPES } from "../types";
import "./FormNote.css";
import ModalConfirm from "./ModalConfirm";
import { IoMdExit } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoIosSave } from "react-icons/io";
const FormNote = ({ handleChange }) => {
  const { dispatchNotes, setNoteForm, noteForm, notes } =
    useContext(NotesContext);
  const refForm = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteAndExitForm = () => {
    // aplica para todos los elementos dentro del form
    dispatchNotes({
      type: TYPES.ADD_NOTE_TO_FORM,
      payload: { isAddingNote: false },
    });
    setNoteForm({
      ...initialForm,
    });
  };

  const handleExit = (e) => {
    e.preventDefault();
    deleteAndExitForm();
  };

  const handleSave = (e) => {
    e.preventDefault();
    // update
    if (noteForm.id) {
      const updatedNote = {
        ...noteForm,
      };
      const updatedNotes = notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
      localStorage.setItem("yoc-notas", JSON.stringify(updatedNotes));
      dispatchNotes({ type: TYPES.UPDATE_NOTE, payload: updatedNote });
      deleteAndExitForm();
      return;
    }
    // save
    const newNote = { id: uuidv4(), ...noteForm, date: new Date() };
    localStorage.setItem("yoc-notas", JSON.stringify([...notes, newNote]));
    dispatchNotes({ type: TYPES.SAVE_NOTE, payload: newNote });
    deleteAndExitForm();
  };
  const handleDelete = (e) => {
    // console.log(e);
    e.preventDefault();
    if (noteForm.id) {
      const newNotes = notes.filter((note) => note.id !== noteForm.id);
      localStorage.setItem("yoc-notas", JSON.stringify(newNotes));
      dispatchNotes({ type: TYPES.DELETE_NOTE, payload: newNotes });
      deleteAndExitForm();
      setModalIsOpen(false);
    }
  };
  return (
    <form ref={refForm} className="main__form">
      <ModalConfirm
        open={modalIsOpen}
        handleClose={() => setModalIsOpen(false)}
        areYouSure={handleDelete}
      >
        <p>¿Estás seguro que deseas eliminar esta nota?</p>
      </ModalConfirm>
      <input
        onChange={handleChange}
        className="main__title"
        type="text"
        name="title"
        placeholder="Titulo de la nota"
        value={noteForm.title}
        autoComplete="off"
      />
      <textarea
        onChange={handleChange}
        name="body"
        className="main__body"
        value={noteForm.body}
        placeholder="Cuerpo del documento"
      ></textarea>
      {noteForm.id && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setModalIsOpen(true);
          }}
          className="main__delete"
        >
          <AiTwotoneDelete />
        </button>
      )}
      <button onClick={handleExit} className="main__exit">
        <IoMdExit />
      </button>
      <button onClick={handleSave} className="main__save">
        <IoIosSave />
      </button>
      <span className="main__id-note">Nota: {noteForm.id}</span>
    </form>
  );
};

export default FormNote;
