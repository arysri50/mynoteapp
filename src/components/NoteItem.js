// src/components/NoteItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import { deleteNote } from '../utils/localStorage';

const NoteItem = ({ note, onDelete }) => {
  const handleDelete = () => {
    deleteNote(note.id);
    onDelete(note.id);  // Call the onDelete prop to refresh the list
  };

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.content.substring(0, 100)}...</p>
      <p>{new Date(note.timestamp).toLocaleString()}</p>
      <Link to={`/edit/${note.id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NoteItem;
