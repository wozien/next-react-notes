import { getNote } from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import NoteEditor from "@/components/NoteEditor";

type IPageProps = {
  params: {
    id: string
  }
}

export default async function Page({ params }: IPageProps) {
  const noteId = params.id;
  const note = await getNote(noteId);

  await sleep(1000);

  if (!note) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return <NoteEditor noteId={noteId} initialTitle={note.title} initialBody={note.content} />
}