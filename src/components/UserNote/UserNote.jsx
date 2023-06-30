import "./UserNote.css";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import { useState } from "react";

const UserNote = ({ id, title, synopsis, body, dateCreated }) => {
  const [open, setOpen] = useState(false);
  const handleOpenCloseModal = () => {
    setOpen(!open);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <div className="user-note">
      <h2 className="user-note__title">{title}</h2>
      <p className="user-note__synopsis">{synopsis}</p>
      <p className="user-note__date-created">
        You created this on : <span>{dateCreated}</span>
      </p>
      <p
        className="user-note__body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="user-note__controls">
        <Link to={`/read/${id}`} className="user-note__controls__button">
          <BiLinkExternal />
          <span>read notes</span>
        </Link>
        <Link to={`/update/${id}`} className="user-note__controls__button">
          <BsPencilSquare />
          <span>update notes</span>
        </Link>
        <button
          className="u-delete user-note__controls__button"
          onClick={handleOpenCloseModal}
        >
          <MdOutlineDeleteOutline />
          <span>Delete notes</span>
        </button>
      </div>
      <DeleteConfirm isOpen={open} onClose={handleCloseModal} id={id} />
    </div>
  );
};
export default UserNote;
