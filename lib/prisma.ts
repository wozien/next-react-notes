import { PrismaClient } from '@prisma/client'
import { auth } from 'auth'

type GlobalForPrisma = typeof globalThis & {
  prisma?: PrismaClient;
}

const globalForPrisma: GlobalForPrisma = global

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function addUser(username: string, password: string) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      notes: {
        create: []
      }
    }
  })

  return {
    id: user?.id,
    name: username,
    username,
    userId: user?.id
  }
}

export async function getUser(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username
    },
    include: {
      notes: true
    }
  })
  if (!user) return 0
  if (user.password !== password) return 1

  return {
    id: user?.id,
    name: username,
    username,
    userId: user?.id
  }
}

export async function getAllNotes() {
  const session = await auth()
  if (session == null) return [];

  const notes = await prisma.note.findMany({
    where: {
      authorId: session.user?.id
    }
  })

  const res: Record<string, string> = {};
  notes.forEach(({ title, id, content, updatedAt }) => {
    res[id] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  })
  return res
}

export async function addNote(data: string) {
  const session = await auth()
  const parseData = JSON.parse(data)
  const result = await prisma.note.create({
    data: {
      title: parseData.title,
      content: parseData.content,
      author: { connect: { id: session?.user?.id }}
    }
  })

  return result.id
}

export async function updateNote(uuid: string, data: string) {
  const parseData = JSON.parse(data)
  return await prisma.note.update({
    where: {
      id: uuid
    },
    data: {
      title: parseData.title,
      content: parseData.content
    }
  })
}

export async function getNote(uuid: string) {
  const session = await auth()
  if (session == null) return null;;

  const record = await prisma.note.findFirst({
    where: {
      id: uuid,
      authorId: session.user?.id
    }
  })

  if (record) {
    return {
      id: record.id,
      title: record.title,
      content: record.content,
      updateTime: record.updatedAt
    }
  }
}

export async function delNote(uuid: string) {
  return await prisma.note.delete({
    where: {
      id: uuid
    }
  })
}