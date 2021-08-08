import { useContext, useEffect, useRef } from "react";
import NotesContext from "../context/NotesProvider";
import { TYPES } from "../types";
import "./NoteCard.css";
const NoteCard = ({ id, body, title, date }) => {
  const { dispatchNotes, setNoteForm } = useContext(NotesContext);
  const refBody = useRef();
  const dateObj = new Date(date);
  useEffect(() => {
    body
      ? (refBody.current.innerText = body)
      : (refBody.current.innerHTML =
          "<span class='empty-card'>contenido vacío</span>");
  }, [body]);

  const handleClick = () => {
    dispatchNotes({
      type: TYPES.ADD_NOTE_TO_FORM,
      payload: { isAddingNote: true },
    });
    dispatchNotes({
      type: TYPES.IS_EDITING_NOTE,
      payload: { isEditingNote: true },
    });
    setNoteForm({ title, body, id, date });
  };
  return (
    <article onClick={handleClick} className="notes-list__card">
      <div className="card__title">
        {title || <span className="empty-card">Titulo vacío</span>}
      </div>
      <div ref={refBody} className="card__body">
        {/* {body || <span className="empty-card">vacío</span>} */}
      </div>
      <div className="card__date">
        {/* {console.log(date)} */}
        {dateObj.toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }) || "sin fecha"}
      </div>
    </article>
  );
};

export default NoteCard;
