import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notes.css";

function NotesApp({ handleSaveNote }) {
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (heading && body) {
      handleSaveNote({ heading, body }); 
      navigate("/notes"); 

    } else {
      alert("Please fill out both fields.");
    }
  };
 


  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter the Heading"
          className="inputarea"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
        <textarea
          placeholder="Enter Your Message"
          className="bodytext"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save Notes</button>
    </div>
  );
}

export default NotesApp;


