import { getNote } from "@/lib/strapi"
import { sleep } from "@/lib/utils";
import Note from "@/components/Note";

type NotePageProps = {
  params: {
    id: string
  }
}

export default async function Page({ params }: NotePageProps) {
  const noteId = params.id;
  const note = await getNote(noteId);

  // 让骨架屏效果更加明显
  await sleep(1000)

  if (note === null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  return (
    <Note noteId={noteId} note={note} />
  )
};

