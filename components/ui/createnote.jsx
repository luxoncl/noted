import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import { Zoom } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./create.css";

const Createnote = (props) => {
  const [isExpanded, setIsExpanaded] = useState(false);
  const [note, setNote] = useState({ title: "", content: "" });
  const expand = () => {
    setIsExpanaded(true);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };
  const submitNote = (event) => {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
  };
  return (
    <div className="">
      <h1>
        <form className="form">
          {isExpanded && (
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              value={note.title}
            />
          )}
          <textarea
            name="content"
            placeholder="Take a note.."
            onClick={expand}
            onChange={handleChange}
            rows={isExpanded ? 3 : 1}
            value={note.content}
          />
          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </h1>
    </div>
  );
};
export default Createnote;
