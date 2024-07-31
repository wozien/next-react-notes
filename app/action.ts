'use server';

import { redirect } from "next/navigation";
import { updateNote, addNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z } from 'zod';
import { INoteEditorState } from "@/types";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100')
});

export async function saveNote(preState: INoteEditorState, formData: FormData) {
  const noteId = formData.get('noteId') as string;

  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: Date.now()
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues
    }
  }

  if (noteId) {
    updateNote(noteId, JSON.stringify(data));
    // 清除完整的路由缓存,不然在生产模式会有缓存问题
    revalidatePath('/', 'layout');
  } else {
    addNote(JSON.stringify(data));
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
