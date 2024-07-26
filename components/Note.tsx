import dayjs from 'dayjs';
import EditButton from './EditButton';
import NotePreview from './NotePreview';
import type { NoteItem } from  '@/types';

type NoteProps = {
  noteId: string;
  note: NoteItem
}

export default function Note({ noteId, note }: NoteProps) {
  const { title, content, updateTime } = note;

  return (
    <div className="note">
      <div className="note-header">
        <h1 className="note-title">{title}</h1>
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            Last updated on {dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')}
          </small>
          <EditButton noteId={noteId}>Edit</EditButton>
        </div>
      </div>
      <NotePreview content={content} />
    </div>
  )
}