import { useContext } from "react";
import NotesContext from "../context/NotesProvider";
import NoteCard from "./NoteCard";
import "./NotesList.css";
const NotesList = () => {
  const { notes } = useContext(NotesContext);
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          date={note.date}
        />
      ))}
    </div>
  );
};

export default NotesList;
