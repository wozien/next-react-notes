'use client';

import { useState } from "react";
import { useFormState } from "react-dom";
import NotePreview from "./NotePreview";
import { saveNote, deleteNote } from "@/app/action";
import SaveButton from "./SaveButton";
import DeleteButton from "./DeleteButton";
import type { INoteEditorState } from "@/types";

const initialState: INoteEditorState = {}

type NoteEditorProps = {
  noteId: string | null;
  initialTitle: string;
  initialBody: string;
}

export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody
}: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  const [saveState, saveFormAction] = useFormState<INoteEditorState, FormData>(saveNote, initialState);
  const [, delFormAction] = useFormState<INoteEditorState, FormData>(deleteNote, initialState);

  const isNew = !noteId;

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId|| ''}/>
          <SaveButton formAction={saveFormAction}/>
          <DeleteButton isNew={isNew} formAction={delFormAction}/>
        </div>
        <div className="note-editor-menu">
          { saveState?.message }
          { saveState?.errors && saveState.errors[0]?.message } 
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input 
          id="note-title-input"
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea 
          id="note-body-input"
          name="body"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
      </form>

      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview content={body}/>
      </div>
    </div>
  )
}