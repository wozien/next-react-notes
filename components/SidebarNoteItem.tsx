import dayjs from 'dayjs';
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent'
import type { NoteItem } from '@/types'

type IProps = {
  noteId: string;
  note: NoteItem;
}

export default function SidebarNoteItem({ noteId, note }: IProps) {
  const { title, updateTime, content = '' } = note;

  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      } 
    >
      {/* 这里会先在改服务端组件渲染，然后再传给 SidebarNoteItemContent 组件，dayjs不会进客户端bundle中 */}
      <header className="sidebar-note-header">
        <strong>{title}</strong>
        <small>{dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')}</small>
      </header>
    </SidebarNoteItemContent>
  )
}