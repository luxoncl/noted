"use client";

import React, { useState } from "react";
import CreateNote from "@/components/ui/createnote";
import Stick from "@/components/ui/Stick";

function Sticks() {
  const [notes, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  };

  return (
    <div>
      <CreateNote onAdd={addNote} />
      {notes.map((note, index) => (
        <Stick
          key={index}
          id={index}
          title={note.title}
          content={note.content}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
}

export default Sticks;
