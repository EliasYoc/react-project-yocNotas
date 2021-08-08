import reactDom from "react-dom";
import "./ModalConfirm.css";

const ModalConfirm = ({ open, children, handleClose, areYouSure }) => {
  if (!open) return false;
  return reactDom.createPortal(
    <article onClick={handleClose} className="modal">
      <div
        className="modal__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
        <div className="modal__btns">
          <button className="modal__cancel" onClick={handleClose}>
            Cancelar
          </button>
          <button className="modal__accept" onClick={areYouSure}>
            Aceptar
          </button>
        </div>
      </div>
    </article>,
    document.getElementById("portal-confirm")
  );
};

export default ModalConfirm;
