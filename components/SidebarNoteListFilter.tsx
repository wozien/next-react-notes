'use client';

import { useSearchParams } from "next/navigation";
import { NoteItem } from "@/types";

type IProps = {
  notes: {
    noteId: string;
    note: NoteItem;
    item: React.ReactNode;
  }[];
};

export default function SidebarNoteListFilter({ notes }: IProps) {
  const params = useSearchParams();
  const queryText = params.get('q');

  return (
    <ul className="notes-list">
      {
        notes.map(({ noteId, note, item }) => {
          if (!queryText || (queryText && note.title.toLowerCase().includes(queryText.toLowerCase()))) {
            return <li key={noteId}>{item}</li>
          }
        })
      }
    </ul>
  )
}