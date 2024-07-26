'use server';

import { redirect } from "next/navigation";
import { updateNote, addNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { INoteEditorState } from "@/types";

export async function saveNote(preState: INoteEditorState, formData: FormData) {
  const noteId = formData.get('noteId') as string;

  const data = JSON.stringify({
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: Date.now()
  });

  if (noteId) {
    updateNote(noteId, data);
    // 清除完整的路由缓存,不然在生产模式会有缓存问题
    revalidatePath('/', 'layout');
  } else {
    addNote(data);
    revalidatePath('/', 'layout');
  }

  return { message: 'Add Success!' };
}

export async function deleteNote(preState: INoteEditorState, formData: FormData) {
  const noteId = formData.get('noteId') as string;

  delNote(noteId);
  revalidatePath('/', 'layout');
  redirect('/');

};
