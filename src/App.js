import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Pagination from './components/Pagination';
import { getNotes } from './utils/localStorage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Simple Note Taking App</h1>
          <a href="/add">Add New Note</a>
        </header>
        <Routes>
          <Route path="/" element={<NoteList currentPage={currentPage} notesPerPage={notesPerPage} />} />
          <Route path="/add" element={<NoteForm />} />
          <Route path="/edit/:id" element={<NoteForm />} />
        </Routes>
        <Pagination
          totalNotes={getNotes().length}
          notesPerPage={notesPerPage}
          paginate={paginate}
        />
      </div>
    </Router>
  );
}

export default App;
