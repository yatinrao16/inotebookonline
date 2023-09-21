import React, { useContext } from "react";
import noteContext from "../context/notes/notecontext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
 
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body" style={{ backgroundColor:"yellow"}}>
          <div className="d-flex align-items-center">
            <h5 className="card-title" style={{width:"15rem",top:"1rem", backgroundColor:"yellow"}}>{note.title}</h5>
            <span className="float-end mx-2"><i
              className="far fa-trash-alt "
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i></span>
           <span className="float-end" > <i
              className="far fa-edit"
              onClick={() => {
                updateNote(note);
              }}
            ></i></span>
          </div>
          <p className="card-text my-2">{note.description}</p>
          <span className="container position-absolute badge rounded-pill bg-primary zIndex-0" style={{width:"5rem",top:"-0.7rem",left:"14rem"}}>
          {note.tag}
          </span>
       
          <p className="card-text my-2">{note.date}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
