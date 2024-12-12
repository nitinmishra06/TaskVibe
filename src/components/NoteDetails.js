import React from "react";
import { useParams } from "react-router-dom";
import "./NoteDetails.css";

function NoteDetails({ notes }) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === parseInt(id));

  if (!note) {
    return <p>Note not found!</p>;
  }

  return (
    <div>
      <h1>{note.heading}</h1>
      <p>{note.body}</p>
    </div>
  );
}

export default NoteDetails;
