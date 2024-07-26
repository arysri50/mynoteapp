import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNotes, saveNotes } from '../utils/localStorage';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const notes = getNotes();
      const note = notes.find(note => note.id === parseInt(id));
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const notes = getNotes();
    if (id) {
      const updatedNotes = notes.map(note =>
        note.id === parseInt(id)
          ? { ...note, title, content, timestamp: new Date().toISOString() }
          : note
      );
      saveNotes(updatedNotes);
    } else {
      const newNote = {
        id: notes.length ? Math.max(notes.map(note => note.id)) + 1 : 1,
        title,
        content,
        timestamp: new Date().toISOString(),
      };
      saveNotes([...notes, newNote]);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;
