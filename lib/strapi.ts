export async function getAllNotes() {
  const response = await fetch("http://127.0.0.1:1337/api/notes");
  const data = await response.json();

  const res: Record<string, string> = {};

  data.data.forEach(({ attributes: { title, content, updatedAt, slug } }: any) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  });

  return res
}

export async function addNote(data: string) {
  const response = await fetch('http://127.0.0.1:1337/api/notes', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${process.env.STRAPI_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })

  const res = await response.json()
  return res.data.attributes.slug
}

export async function getNote(uuid: string) {
  const response = await fetch(`http://127.0.0.1:1337/api/notes?filters[slug][$eq]=${uuid}`)
  const data = await response.json()
  const { title, content, updatedAt } = data.data[0].attributes

  return {
    id: data.data[0].id,
    title,
    content,
    updatedAt
  }
}

export async function updateNote(uuid: string, data: string) {
  const { id } = await getNote(uuid)
  const response = await fetch(`http://127.0.0.1:1337/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `bearer ${process.env.STRAPI_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })

  const res = await response.json()
  return res
}

export async function delNote(uuid: string) {
  const { id } = await getNote(uuid)
  const response = await fetch(`http://127.0.0.1:1337/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `bearer ${process.env.STRAPI_TOKEN}`,
      "Content-Type": "application/json"
    }
  })

  const res = await response.json()
  return res
}