import { TYPES } from "../types";

const notesReducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_NOTE_TO_FORM:
      return { ...state, ...action.payload };
    case TYPES.GET_ALL_NOTES:
      return { ...state, notes: [...action.payload] };
    case TYPES.SAVE_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
    case TYPES.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case TYPES.DELETE_NOTE:
      return {
        ...state,
        notes: [...action.payload],
      };
    default:
      return state;
  }
};
export default notesReducer;
