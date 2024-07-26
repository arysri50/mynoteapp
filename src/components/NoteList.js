// src/components/NoteList.js
import React, { useState, useEffect } from 'react';
import { getNotes } from '../utils/localStorage';
import NoteItem from './NoteItem';

const NoteList = ({ currentPage, notesPerPage }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const handleDelete = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  return (
    <div>
      {currentNotes.map(note => (
        <NoteItem key={note.id} note={note} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default NoteList;
