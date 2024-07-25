'use client';

import { PropsWithChildren, useEffect, useRef, useState, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

type IProps = {
  id: string;
  title: string;
  expandedChildren: React.ReactNode;
};

export default function SidebarNoteContent ({
  id,
  title,
  children,
  expandedChildren
}: PropsWithChildren<IProps>) {
  const router = useRouter();
  const pathname = usePathname() as string;
  const selectId = pathname?.split('/')[2] || null;

  const itemRef = useRef<HTMLDivElement>(null);
  const preTitle = useRef<string>(title);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPending] = useTransition();
  const isActive = id === selectId;

  useEffect(() => {
    if (title !== preTitle.current) {
      preTitle.current = title;
      itemRef.current!.classList.add('flash');
    }
  }, [title]);

  return (
    <div 
      ref={itemRef}
      className={['sidebar-note-list-item', isExpanded ? 'note-expanded' : ''].join(' ')}
      onAnimationEnd={() => {
        if (itemRef.current) {
          itemRef.current.classList?.remove('flash');
        }
      }}
    >
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending
            ? 'var(--gray-80)'
            : isActive
              ? 'var(--tertiary-blue)'
              : '',
          border: isActive
            ? '1px solid var(--primary-border)'
            : '1px solid transparent',
        }}
        onClick={() => {
          const sidebarToggle = document.getElementById('sidebar-toggle') as HTMLInputElement;
          if (sidebarToggle) {
            sidebarToggle.checked = true
          }
          router.push(`/note/${id}`)
        }}>
        {/* Open note for preview */}
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}>
        {isExpanded ? (
          <Image
            src="/chevron-down.svg"
            width={10}
            height={10}
            alt="Collapse"
          />
        ) : (
          <Image src="/chevron-up.svg" width={10} height={10} alt="Expand" />
        )}
      </button>
      {isExpanded && expandedChildren}
    </div>
  )
} 