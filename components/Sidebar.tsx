import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarNoteList from './SidebarNoteList';
import EditButton from "./EditButton";
import NoteListSkeleton from "./NoteListSkeleton";
import SidebarSearchField from "./SidebarSearchField";
import SidebarImport from "./SidebarImport";

export default async function Sidebar() {

  return (
    <section className="col sidebar">
      <Link href="/" className="link--unstyled">
        <section className="sidebar-header">
          <Image
            className="logo"
            src="/logo.svg"
            width={20}
            height={20}
            alt=""
            role="presentation"
          />
          <strong>React Notes</strong>
        </section>
      </Link>
      <section className="sidebar-menu" role="menubar">
        <SidebarSearchField />
        <EditButton noteId={null}>New</EditButton>
      </section>
      <nav>
        <Suspense fallback={<NoteListSkeleton />}>
          <SidebarNoteList />
        </Suspense>
      </nav>
      <SidebarImport />
    </section>
  );
}
