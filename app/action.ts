'use server';

import { stat, writeFile, mkdir } from 'fs/promises'
import { join } from "path";
import { redirect } from "next/navigation";
import { updateNote, addNote, delNote } from "@/lib/redis";
import { revalidatePath } from "next/cache";
import { z } from 'zod';
import { INoteEditorState } from "@/types";
import dayjs from "dayjs";
import mime from 'mime';

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

export async function importNode(formData: FormData) {
  const file = formData.get('file') as File;

  if (!file) {
    return { error: "File is required." };
  }

  // 创建文件夹
  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dayjs().format('YY-MM-DD')}`;
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(err);
      return { error: "Something went wrong." };
    }
  } 

  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString().slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, "");
    const uniqueFilename = `${filename}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    // 写入redis
    const res = await addNote(JSON.stringify({
      title: filename,
      content: buffer.toString('utf-8'),
    }));

    revalidatePath('/', 'layout');

    return {
      uid: res,
      fileUrl: `${relativeUploadDir}/${uniqueFilename}`
    }

  } catch(err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}
