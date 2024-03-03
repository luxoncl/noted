"use client";

import React, { useState } from "react";
import CreateNote from "@/components/ui/createnote";
import Stick from "@/components/ui/Stick";
import { ReactMic } from "react-mic";
import { Button } from "@/components/ui/button";

function Sticks() {
  const [notes, setNotes] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [record, setRecord] = useState(false);
  const [loading, setLoading] = useState(false);
  const [convertedText, setConvertedText] = useState("");
  const [translateText, setTranslateText] = useState("");
  const [formData, setFormData] = useState(null);

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

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const getblob = async (testAudioRecord) => {
    let blobb = await fetch(testAudioRecord).then((r) => r.blob());
    console.log(blobb);
    return blobb;
  };

  const onStop = async (recordedBlob) => {
    let testAudioRecord = URL.createObjectURL(recordedBlob.blob);
    const nice = await getblob(testAudioRecord);
    console.log(nice);
    const data = new FormData();
    data.append("file", nice, "test.webm");
    data.append("model", "whisper-1");
    sendAudio(data);
  };

  const sendAudio = async (dat) => {
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      headers: {
        Authorization: `Bearer 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`,
      },
      method: "POST",
      body: dat,
    });

    const data = await res.json();

    setConvertedText(data.text);
    addNote({
      title: "New Audio Note",
      content: data.text,
    });
  };

  return (
    <div>
      <CreateNote onAdd={addNote} />
      <div className="fixed right-10 bottom-10">
        <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <div className="flex justify-around mt-5">
          <Button onClick={startRecording} type="button">
            Start
          </Button>
          <Button onClick={stopRecording} type="button">
            Stop
          </Button>
        </div>
      </div>
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
