import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = "https://spkrapp.herokuapp.com";
  const notesInitial = []  
  const [notes, setNotes] = useState(notesInitial);

   // Fetch all notes
   const getNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json(); 
    console.log(json);
    setNotes(json);
  }

  // Add a note
  const addNote = async (title, description, tag)=>{
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },    
      body: JSON.stringify({title, description, tag}) 
    });
    const json = await response.json(); 
    console.log(json);    
    setNotes(notes.concat(json))
  }

  // Edit a note
 const editNote = async (id, title, description, tag)=>{
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },    
      body: JSON.stringify({title, description, tag}) 
    });
    const json = await response.json(); 
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }      
      }
      setNotes(newNotes);
  }

  // Delete a note
  const deleteNote = async (id)=>{
    let confirmStatus = window.confirm("Are you sure?");     
    if(confirmStatus === true){
     // API Call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',   
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        } 
      });
      const json = await response.json();
      console.log(json);

      console.log("Deleting the note with id " + id);
      // Client side
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes);
    }
  }

  // const [notes,setNotes] = useState(notesInitial)
  return (
      <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
          {props.children}
      </NoteContext.Provider>
  )
}
export default NoteState;