import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

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

const Temp = () => {
  const [value, setValue] = useState("");
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        modules={modules}
        formats={formats}
        className="editor"
      >
        <div className="editing-area"></div>
      </ReactQuill>
    </div>
  );
};

export default Temp;
