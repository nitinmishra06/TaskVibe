import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NoteAdd.css";

function NotesAdd({ notes, handleSaveNote }) {
  const navigate = useNavigate(); // Hook for navigation

  const handleAddNotes = () => {
    navigate("/AddNotes"); // Navigate to the Notes page
  };

  return (
    <div>
      <button onClick={handleAddNotes} className="Noting">
        Add Notes
      </button>
      <div>
        <h2 className="Saved">Saved Notes</h2>
        {notes.map((note) => (
          <div className="HeadNote" key={note.id}>
            <Link to={`/note/${note.id}`}>
              <h3>{note.heading}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesAdd;

