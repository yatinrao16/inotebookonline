import React, { useContext, useState } from "react";
import noteContext from "../context/notes/notecontext";

const AddNotes = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "Todo" });

  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              value={note.title}
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onchange}
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              value={note.description}
              id="Description"
              name="description"
              onChange={onchange}
              minLength={5}
            />
          </div>
          <div className="mb-3 my-4">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="tag"
              value={note.tag}
              onChange={onchange}
              name="tag"
            >
              <option value="Todo">Todo</option>
              <option value="Important">Important</option>
              <option value="Academic">Academic</option>
              <option value="Personal">Personal</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleclick}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNotes;
