'use client';

import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";

function Spinner({active = true}: any) {
  return (
    <div
      className={['spinner', active && 'spinner--active'].join(' ')}
      role="progressbar"
      aria-busy={active ? 'true' : 'false'}
    />
  );
}


export default function SidebarSearchField() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder="Search"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending}/>
    </div>
  )
}