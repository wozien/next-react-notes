'use client';

import { useRouter } from "next/navigation";
import { importNode } from "@/app/action";
import type { ChangeEvent } from "react";

export default function SidebarImport() {
  const router = useRouter();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await importNode(formData);
      router.push(`/note/${res.uid}`);
    } catch(err) {
      console.error("something went wrong");
    }

    // 重置file input
    e.target.type = 'text';
    e.target.type = 'file';
  }

  return (
    <div style={{ textAlign: "center" }}>
      <label htmlFor="file" style={{ cursor: 'pointer' }}>Import .md File</label>
      <input 
        id="file"
        name="file"
        type="file"
        style={{
          position: 'absolute',
          clip: "rect(0 0 0 0)"
        }}
        onChange={onChange}
        accept=".md"
      />
    </div>
  )
}