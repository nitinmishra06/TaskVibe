import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Body from './components/Body.js';
import NotesAdd from './components/NotesAdd.js'; 
import NotesApp from './components/Notes.js';
import NoteDetails from './components/NoteDetails';

function App() {
  const [notes, setNotes] = useState([]); // State to store notes

  const handleSaveNote = (note) => {
    setNotes([...notes, { id: notes.length + 1, ...note }]); // Add note with unique ID
  };


  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Body />} />
        <Route path="/notes" element={<NotesAdd notes={notes} handleSaveNote={handleSaveNote} />} />
        <Route path="/AddNotes" element={<NotesApp handleSaveNote={handleSaveNote}/>}/>
        <Route
          path="/note/:id"
          element={<NoteDetails notes={notes} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
