import ReactQuill from "react-quill";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Helpers/Context";
import { useContext } from "react";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { useState, useRef, useEffect } from "react";
import HomeFeedNav from "../../components/HomeFeedNav/HomeFeedNav";
import "./Studio.css";
import apiDomain from "../../utils/utilsDomain";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Studio = () => {
  const { username, setUserName } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [body, setBody] = useState("");
  const handleCreateNotes = async (e) => {
    e.preventDefault();
    if (title && synopsis && body) {
      const notesBody = { username, title, synopsis, body };
      const createNotes = await fetch(
        `${apiDomain}/${username}/notes/new`,
        {
          method: "POST",
          body: JSON.stringify(notesBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const notesCreated = await createNotes.json();

      if (notesCreated.status !== 400) {
        toast.success(
          "Notes written successfully, redirecting to explore page"
        );
        setTimeout(() => navigate("/explore-notes"), 3000);
      } else {
        console.log(notesCreated);
        toast.error("Something went wrong while writing your new notes");
      }
    } else {
      toast.info("One of the fields is empty");
      return;
    }
  };
  return (
    <>
      <HomeFeedNav />
      <div className="studio__container">
        <h2 className="studio__container--title">
          write your notes {username}
        </h2>
        <form onSubmit={handleCreateNotes}>
          <div className="form-group">
            <label
              htmlFor="notes_title"
              className="form-group-lable u-dark-fix"
            >
              Enter notes title
            </label>
            <input
              type="text"
              name="title"
              id="notes_title"
              className="form-text-input u-input-border-fix input-placeholder-fix"
              placeholder="e.g How to connect mssql with express step by step"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="synopsis" className="form-group-lable u-dark-fix">
              Brief summary of your notes
            </label>
            <input
              type="text"
              name="synopsis"
              id="synopsis"
              className="form-text-input u-input-border-fix input-placeholder-fix"
              placeholder="a step by step guide on how to connect mssql with express"
              onChange={(e) => setSynopsis(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="synopsis" className="form-group-lable u-dark-fix">
              Write your notes
            </label>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              className="editor"
              value={body}
              onChange={(content) => setBody(content)}
              name="body"
            ></ReactQuill>
          </div>
          <div className="buttons">
            <button className="btn btn--save">Save</button>
            <Link to="/explore-notes" className="btn-cancel">
              cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default Studio;
