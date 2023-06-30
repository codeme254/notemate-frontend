import HomeFeedNav from "../../components/HomeFeedNav/HomeFeedNav";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Helpers/Context";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./UpdateNote.css";
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

const UpdateNote = () => {
  const navigate = useNavigate();
  const { username, setUsername } = useContext(UserContext);
  const { notes_id } = useParams();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [body, setBody] = useState("");

  const [currentSnapShot, setCurrentSnapShot] = useState({
    title: "",
    synopsis: "",
    body: "",
  });

  useEffect(() => {
    const fetchNotesDetails = async () => {
      if (!notes_id) {
        toast.error(`Unable to update notes at this time`);
        return;
      }
      const response = await fetch(`${apiDomain}/notes/${notes_id}`);
      const responseData = await response.json();
      setTitle(responseData.title);
      setSynopsis(responseData.synopsis);
      setBody(responseData.body);
      setCurrentSnapShot((previousState) => ({
        ...previousState,
        title: responseData.title,
        synopsis: responseData.synopsis,
        body: responseData.body,
      }));
    };
    fetchNotesDetails();
  }, [notes_id]);

  // http://localhost:8081/gracebaker/4fd9e500-83ec-4171-96ac-e34f9ae7dbf3
  const handleUpdateNotes = async (e) => {
    e.preventDefault();
    const updateBody = { title, synopsis, body };
    if (
      title === currentSnapShot.title &&
      synopsis === currentSnapShot.synopsis &&
      body === currentSnapShot.body
    ) {
      toast.info("No update done");
      return;
    }
    const response = await fetch(
      `${apiDomain}/${username}/${notes_id}`,
      {
        method: "PUT",
        body: JSON.stringify(updateBody),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.status);
    if (response.status === 200) {
      setTimeout(() => navigate("/my-notes"), 3500);
      toast.success("Update done successfully");
      return;
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <HomeFeedNav />
      <div className="update__container">
        <h4 className="update__heading">
          You are about to update: <span>{title}</span>
        </h4>

        <form onSubmit={handleUpdateNotes}>
          <div className="form-group">
            <label
              htmlFor="notes_title"
              className="form-group-lable u-dark-fix"
            >
              New title (optional)
            </label>
            <input
              type="text"
              name="title"
              id="notes_title"
              className="form-text-input u-input-border-fix input-placeholder-fix"
              placeholder="e.g How to connect mssql with express step by step"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="synopsis" className="form-group-lable u-dark-fix">
              New summary (optional)
            </label>
            <input
              type="text"
              name="synopsis"
              id="synopsis"
              className="form-text-input u-input-border-fix input-placeholder-fix"
              placeholder="a step by step guide on how to connect mssql with express"
              defaultValue={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="synopsis" className="form-group-lable u-dark-fix">
              New content (optional)
            </label>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              className="editor"
              value={body}
              name="body"
              onChange={(content) => setBody(content)}
              defaultValue={body}
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
export default UpdateNote;
