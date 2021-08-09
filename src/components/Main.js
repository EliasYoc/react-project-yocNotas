import { useContext } from "react";
import NotesContext from "../context/NotesProvider";
import FormNote from "./FormNote";
import "./Main.css";

const Main = () => {
  const { isAddingNote, noteForm, setNoteForm } = useContext(NotesContext);

  const handleChange = (e) => {
    setNoteForm({ ...noteForm, [e.target.name]: e.target.value });
  };
  return (
    <main className="main">
      {isAddingNote ? (
        <FormNote handleChange={handleChange} />
      ) : (
        <div className="main__message">
          <h1>selecciona o agrega una nota</h1>
          <video
            loop
            autoPlay
            muted
            src="https://res.cloudinary.com/diusrxrra/video/upload/v1628391643/nota_dahujw.webm"
          ></video>
        </div>
      )}
    </main>
  );
};

export default Main;
