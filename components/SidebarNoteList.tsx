import { getAllNotes } from "@/lib/prisma";
import { sleep } from '@/lib/utils'
import SidebarNoteListFilter from "./SidebarNoteListFilter";
import SidebarNoteItem from "./SidebarNoteItem";

export default async function NoteList() {
  // 为了更加清晰看到骨架屏效果，延迟1s渲染
  await sleep(1000);

  const notes = await getAllNotes();
  
  const arr = Object.entries(notes);

  if (arr.length === 0) {
    return <div className="notes-empty">{"No notes created yet!"}</div>;
  }

  return (
    <SidebarNoteListFilter  
      notes={arr.map(([noteId, note]) => {
        return {
          noteId,
          note: JSON.parse(note),
          item: <SidebarNoteItem key={noteId} noteId={noteId} note={JSON.parse(note)} />
        }
      })}
    />
  );
}
