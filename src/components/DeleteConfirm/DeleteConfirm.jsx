import ReactDOM from "react-dom";
import "./DeleteConfirm.css";
import { useState, useRef, useContext } from "react";
import { UserContext } from "../../Helpers/Context";
import { toast } from "react-toastify";
import apiDomain from "../../utils/utilsDomain";

const DeleteConfirm = ({ isOpen, id, onClose }) => {
  const { username, _ } = useContext(UserContext);
  const [confirmId, setConfirmId] = useState("");
  const [deleteButtonActive, setDeleteButtonActive] = useState(false);
  const buttonRef = useRef(null);

  const handleConfirmId = (e) => {
    const inputValue = e.target.value;
    setConfirmId(inputValue);
    setDeleteButtonActive(id && inputValue === id);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiDomain}/${username}/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("Notes deleted successfully! Please wait...");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong, the error is on our side");
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={isOpen ? "overlay" : "overlay-off"}>
      <div className="delete-prompt">
        <h3 className="prompt-title">Are you sure you want to delete</h3>
        <p className="prompt--text">Please type the following to confirm</p>
        <p className="prompt--text">
          Tip: if the id is too long, you can copy paste it into the input
        </p>
        <form className="confirm-delete-form" onSubmit={handleDelete}>
          <label className="prompt--text" htmlFor="notes_id">
            {id}
          </label>
          <input
            type="text"
            name="notes_id"
            onChange={handleConfirmId}
            className="prompt__input"
            id="notes_id"
          />
          <div className="form-buttons">
            <button
              className={`prompt-btn button-delete ${
                deleteButtonActive ? "active" : ""
              }`}
              ref={buttonRef}
              disabled={!deleteButtonActive}
            >
              Delete
            </button>
            <button className="prompt-btn button-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default DeleteConfirm;
